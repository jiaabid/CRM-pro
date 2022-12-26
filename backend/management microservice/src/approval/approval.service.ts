import { Catch, Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { approvalTypes, APPROVAL_ENTRY_MSG, APPROVAL_MSG, customError, customResponse, ERROR_MSG, FAILURE, REJECT_MSG, RESPONSE_MSG, SUCCESS } from 'src/utils/helper.util';
import { approvalBodyFormatter, logFormatter } from 'src/utils/format.util';
import { approval, user } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApprovalService {
  // @Inject(forwardRef()=>UserService)
  constructor(private readonly prismaService: PrismaService) { }


  //add the entry to the approval table
  async approve(body: CreateApprovalDto, logID: string) {

    log.info(SUCCESS, logFormatter(logID, APPROVAL_MSG, body))

    //get the approver 
    let assign_to: number = await this.getAssignTo(body.createdBy);
    // console.log(assign_to,'in approve')
    //if we have approver assign to them
    if (assign_to) {

      log.info(SUCCESS, logFormatter(logID, APPROVAL_MSG, { message: "Assign further", assignTo: assign_to }));

      try {
        //create new approval entry
        let snap = await this.prismaService.approval.create({
          data:
            { ...body, assignTo: assign_to, createdAt: new Date() }
        })
        log.info(SUCCESS, logFormatter(logID, APPROVAL_ENTRY_MSG, { message: "", assignTo: assign_to }));
        return true
      } catch (err) {
        log.error(FAILURE, logFormatter(logID, ERROR_MSG, { message: "Error in approving", data: err }));

        //delete the entry if the approval isnt created
        const snap = await this.prismaService[body.moduleName].delete({
          where: {
            id: body.itemId
          }
        })
        log.error(FAILURE, logFormatter(logID, ERROR_MSG, { message: "Reverting changes, deleted the entry", data: snap }));
        return false;
      }

    }
    log.info(SUCCESS, logFormatter(logID, APPROVAL_MSG, { message: "Not assigning further, updating the item status" }))

    //else its one who'll approve
    //switch between types (add & update)
    let model = this.prismaService[body.moduleName];
    // console.log(model)
    try {
      if (body.approvalType == approvalTypes.Add) {
        const snap = await model.update({
          where: {
            id: body.itemId
          },
          data: {
            isApproved: true,
            approvedBy: body.createdBy,
            approvedAt: new Date()
          }
        });
        log.info(SUCCESS, logFormatter(logID, APPROVAL_MSG, { message: "Item approved", data: snap }))
        // return true
      } else {
        //parse the update body
        let updateBody = JSON.parse(body.body)
        updateBody['isApproved'] = true;
        updateBody['approvedAt'] = new Date();
        updateBody['approvedBy'] = updateBody.created_by;
        console.log(updateBody, 'update Body')

        let snap = await model.update({
          where: {
            id: body.itemId
          },
          data: updateBody
        })
        log.info(SUCCESS, logFormatter(logID, APPROVAL_MSG, { message: "Item approved", data: snap }))
      }
      // console.log("returining ture")
      return true

    } catch (err) {
      log.error(FAILURE, logFormatter(logID, ERROR_MSG, { message: "Error while updating", data: err }))
      //error updating the entry
      console.log(err, "error")
      return false;
    }
  }

  // get all the assign to from the creator 
  private async getAssignTo(creator) {
    //find the creator entry 
    const item: user = await this.prismaService.user.findUnique({
      where: {
        id: creator
      }
    });
    //if item doesnot exist send false
    if (!item) {
      throw new customError("No such user!").error();
    }
    //return the approver_id
    return item.approverId;
  }


  //mark the entry as approved
  async markApprove(user: user, id: number, logID: string) {
    //find the approval entry
    const snap: approval = await this.prismaService.approval.findUnique({
      where: {
        id
      }
    })

    //check if it has further approver in the hierarchy
    const assign_to: number | null = await this.getAssignTo(snap.assignTo)

    //if it has further assignee, update the current entry entry status
    if (assign_to) {
      try {
        let approvalSnap = await this.prismaService.approval.update({
          where: {
            id
          },
          data: {
            isApproved: true,
            approvedAt: new Date(),
            updatedAt: new Date(),
            updatedBy: user.id

          }
        });
        const isApproved = await this.approve(approvalBodyFormatter(approvalSnap.moduleName, approvalSnap.itemId, approvalSnap.assignTo, approvalSnap.approvalType, approvalSnap.body, approvalSnap.id), logID)
        // console.log(isApproved)
        if (isApproved) {
          return new customResponse("Item approved and sent further for verification", approvalSnap)
        }
      } catch (err) {
        console.log(err);
        return new customError(err).error();
      }
    }

    let approvalSnap = await this.prismaService.approval.update({
      where: {
        id
      },
      data: {
        isApproved: true,
        approvedAt: new Date(),
        updatedAt: new Date(),
        updatedBy: user.id
      }
    })
    return new customResponse("Item approved!", {})

    // try {
    //   await this.updateEntry(snap, logID, user.id);
    // } catch (err) {
    //   console.log(err)
    // }

  }

  //const update the entry 
  private async updateEntry(existing: approval, logID: string, userId: number) {
    let model = this.prismaService[existing.moduleName]
    //if approval type is add
    if (existing.approvalType == approvalTypes.Add) {
      //get the approver of this approver

      //update the item in its respective table
      await model.update({
        where: {
          id: existing.itemId
        },
        data: {
          isApproved: true,
          approvedBy: userId,
          approvedAt: new Date()
        }
      });

      //update the approval item
      await this.prismaService.approval.update({
        where: {
          id: existing.id
        },
        data: {
          isApproved: true,
          approvedAt: new Date(),
          updatedBy: userId,
          updatedAt: new Date()
        }
      });

    } else {
      //parse the update body
      let body = JSON.parse(existing.body)
      body['isApproved'] = true;
      body['approvedAt'] = new Date();
      body['approvedBy'] = userId;

      await model.update(
        {
          where: {
            id: existing.itemId
          },
          data: body
        });

      await this.prismaService.approval.update({
        where: {
          id: existing.id
        },
        data: {
          isApproved: true,
          approvedAt: new Date()
        }
      })
    }
    return true
  }

  //reject the entry
  async markReject(user: user, id: number, rejectDto, logID: string) {
    try {
      log.info(SUCCESS, logFormatter(logID, REJECT_MSG, rejectDto))

      //get the item
      let existing = await this.prismaService.approval.findUnique({
        where: {
          id
        }
      });

      //get the existing approval and update the rejection status and message
      if (existing) {


        //check if it has the previous id
        if (existing.previousId) {
          log.info(SUCCESS, logFormatter(logID, REJECT_MSG, { message: "It has previos id" }))

          let previousItem = await this.prismaService.approval.findUnique({
            where: {
              id: existing.previousId
            }
          })

          //if it has previos item update both
          if (previousItem) {
            //update the previous
            let snap = await this.prismaService.approval.update({
              where: {
                id: previousItem.id
              },
              data: {
                isRejected: true,
                rejectionMessage: rejectDto.rejectionMessage
              }
            });
            log.info(SUCCESS, logFormatter(logID, REJECT_MSG, { message: "previos item updated", data: snap }))


            //update the original
            let approvalSnap = await this.prismaService.approval.update({
              where: {
                id: existing.id
              },
              data: {
                isRejected: true,
                rejectionMessage: rejectDto.rejectionMessage
              }
            })
            log.info(SUCCESS, logFormatter(logID, REJECT_MSG, { message: "original item updated", data: approvalSnap }))
          }
        } else {
          //only update the original
          //update the original
          let approvalSnap = await this.prismaService.approval.update({
            where: {
              id: existing.id
            },
            data: {
              isRejected: true,
              rejectionMessage: rejectDto.rejectionMessage
            }
          })
          log.info(SUCCESS, logFormatter(logID, REJECT_MSG, { message: "original item updated only", data: approvalSnap }))

        }
        log.info(SUCCESS, logFormatter(logID, RESPONSE_MSG, { message: "Item  rejected!", data: existing }))
        //success reponse
        return new customResponse("Item Rejected", existing)
      }
    } catch (err) {
      console.log(err, 'err');
      log.info(FAILURE, logFormatter(logID, ERROR_MSG, err))
      return new customError(err).error();
    }
  }

  //get all the approvals assigned to you with filters
  async getApprovals(user: user, filter: string, type: any, logID: string) {
    let retrievalType: any = { assignTo: user.id };
    if (type !== 'tome') {
      retrievalType = { createdBy: user.id }
    }
    const existing = await this.prismaService.approval.findMany({
      where: {
        ...this.filterQuery(filter),
        isDeleted: false,
        ...retrievalType
      },
      include:{
        approver:true
      }
    })
    return new customResponse("Approvals retrieved", existing)
  }

  private filterQuery(filter: string) {
    switch (filter) {
      case 'pending':
        return {
          'isApproved': false,
          "isRejected": false
        }
      // break;
      case 'approved':
        return {
          'isApproved': true,
          "isRejected": false
        }
      default:
        return {
          'isApproved': false,
          "isRejected": true
        }
    }
  }
}
