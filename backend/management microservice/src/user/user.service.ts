import { Injectable, Request } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { approvalBodyFormatter, logFormatter } from 'src/utils/format.util';
import { approvalTypes, customError, customResponse, DATABASE_MSG, ERROR_MSG, hashPassword, RESPONSE_MSG } from 'src/utils/helper.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { hash, compare } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken'
import { user } from '@prisma/client';
import { ApprovalService } from 'src/approval/approval.service';
import * as path from 'path';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService,
    private readonly approvalService: ApprovalService) { }

  //user login 
  async login(loginDto: LoginDto, logID: string) {
    console.log(loginDto)
    let email = loginDto.email
    const existing = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })
    if (existing) {
      if (!existing.isActive) {
        return new customError("Your account is deactivated!")
      }
      let isPassword = await compare(loginDto.password, existing.password)
      if (!isPassword) {
        return new customError("Invalid Password").error()
      }

      let token = await sign({
        id: existing.id,
        email: existing.email
      }, 'crm')
      return new customResponse("Logged in successfully", {
        token,
        user: existing
      })
    }
    return new customError("Invalid Email").error()
  }

  //create a user 
  async create(user: user, createUserDto: CreateUserDto, logID: string) {
    try {
      // console.log(user)
      log?.info("success", logFormatter(logID, DATABASE_MSG, createUserDto));
      createUserDto['password'] = await hashPassword(createUserDto.password)
      createUserDto['createdBy'] = user.id
      let snap = await this.prismaService.user.create({
        data: {
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
          email: createUserDto.email,
          password: createUserDto.password,
          roleId: createUserDto.roleId,
          deptId: createUserDto.deptId,
          approverId: createUserDto.approverId,
          createdBy: user.id,
          isActive: createUserDto.isActive
        }
      });
      let employeeSnap = await this.prismaService.employee.create({
        // t  itle: createUserDto.title,
        data: {
          title: createUserDto.title,
          address: createUserDto.address,
          contact: createUserDto.contact,
          // status: createUserDto.status,
          city: createUserDto.city,
          region: createUserDto.region,
          country: createUserDto.country,
          postalCode: createUserDto.postalCode,
          description: createUserDto.description,
          userId: snap.id
        }
      })
      const approvalBody = approvalBodyFormatter("user", snap.id, user.id, approvalTypes.Add, null, null)
      console.log(approvalBody, 'approval body')
      let isApproved = await this.approvalService.approve(approvalBody, logID)
      if (isApproved) {
        delete snap.password;
        log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
        return new customResponse("Created successfully!", snap);
      }
      throw new Error("Failed to create approval entry")
    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //get all users
  async findAll(logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.user.findMany({
        where: {
          isDeleted: false,
          NOT:{
            firstname:"admin"
          }
        },
        include:{
          employee:true
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))

      return new customResponse("Retrieved successfully!", snap);
    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }

  //get any user
  async findOne(id: number, logID: string) {
    try {
      // console.log(this.prismaService.user())
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.user.findUnique({
        where: {
          id
        },
        include: {
          department: true,
          employee:true,
          role:{
            include:{
              permissions:true,
              parent:true
            }
          }
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Retrieved successfully!", snap);
    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //update/delete user
  async update(user: user, id: number, updateUserDto: UpdateUserDto, logID: string) {
    let existing = await this.prismaService.user.findUnique({
      where: {
        id
      }
    })
    if (existing) {
      //updating the values against the keys
      Object.keys(updateUserDto).forEach(key => {
        if (key == 'isDeleted') {
          existing[key] = updateUserDto[key]
          return existing['deletedAt'] = new Date();
        } else if (key == 'isApproved') {
          existing[key] = updateUserDto[key]
          return existing['deletedAt'] = new Date();
        }
        existing[key] = updateUserDto[key]
      })

      existing['updatedAt'] = new Date();
      existing['updatedBy'] = user.id;
      try {
        log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
        let itemId = existing.id
        delete existing.id; //delete id as primary key cant be updated

        //update the entry
        let isApproved = await this.approvalService.approve(approvalBodyFormatter("user", itemId, user.id, approvalTypes.Update, existing, null), logID)  
        if (isApproved) {
          log.info("success", logFormatter(logID, RESPONSE_MSG, {}));
          return new customResponse("Updated successfully!", {});
        }

        throw new Error("Failed to create approval entry")
      } catch (err) {
        log?.error("failure", logFormatter(logID, ERROR_MSG, err));
        return new customError(err).error()
      }
    }
    return new customError("Not Found").error()
  }

  //upload the profile photo
  async uploadDp(user: user, id: number, imagepath: string, logID: string) {
   
   console.log( path.join(__dirname,imagepath))
    let snap = await this.prismaService.employee.update({
      where: {
        id: id
      },
      data: {
        photo: path.join(__dirname,imagepath)
      }
    });
    return new customResponse("Profile uploaded!", {})
  }
}

