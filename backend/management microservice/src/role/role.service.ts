import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { winstonLogger as log } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { user } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) { }

  //create new role
  async create(userObj: user, createRoleDto: CreateRoleDto, logID: String) {
    try {

      log?.info("success", logFormatter(logID, DATABASE_MSG, createRoleDto));
      createRoleDto['createdBy'] = userObj.id
      let snap = await this.prismaService.role.create({
        data: createRoleDto
      });
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      let newSnap = await this.prismaService.role.findUnique({
        where: {
          id: snap.id
        },
        include: {
          parent: true
        }
      })
      return new customResponse("Created successfully!", newSnap);

    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //get all the entries
  async findAll(logID: String) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.role.findMany({
        include: {
          parent: true,
          permissions: true
        },
        where: {
          isDeleted: false,
          NOT:{
            name:"admin"
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

  //get one entry
  async findOne(id: number, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.role.findUnique({
        where: {
          id
        },
        include: {
          parent: true,
          permissions: true
        }
      });
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap));
      return new customResponse("Retrieved successfully!", snap);
    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //update the role
  async update(user: user, id: number, updateRoleDto: UpdateRoleDto, logID: string) {
    let existing = await this.prismaService.role.findUnique({
      where: {
        id
      }
    })
    if (existing) {

      //updating the values against the keys
      Object.keys(updateRoleDto).forEach(key => {
        if (key == 'isDeleted') {
          existing[key] = updateRoleDto[key]
          return existing['deletedAt'] = new Date();
        } else if (key == 'isApproved') {
          existing[key] = updateRoleDto[key]
          return existing['deletedAt'] = new Date();
        }
        existing[key] = updateRoleDto[key]
      })

      existing['updatedAt'] = new Date();
      existing['updatedBy'] = user.id;

      try {
        log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
        delete existing['id']
        //update the entry
        let snap = await this.prismaService.role.update({
          where: {
            id
          },
          data: existing
        });
        let newSnap = await this.prismaService.role.findUnique({
          where: {
            id
          },
          include: {
            parent: true
          }
        })
        log.info("success", logFormatter(logID, RESPONSE_MSG, newSnap));
        return new customResponse("Updated successfully!", newSnap);
      } catch (err) {
        log?.error("failure", logFormatter(logID, ERROR_MSG, err));
        return new customError(err).error()
      }
    }
    return new customError("Entry Not Found").error()
  }


  async assignPermission(user: user, assingPermissionDto: AssignPermissionDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let assignPermissionPayload = [];
      assingPermissionDto.permissions.forEach(el => {
        assignPermissionPayload.push({
          roleId: assingPermissionDto.roleId,
          ...el,
          createdBy: user.id
        });
      });
      log.info("success", logFormatter(logID, DATABASE_MSG, { msg: "Values send to db" }))
      await this.prismaService.role_permission.deleteMany({
        where: {
          roleId: assingPermissionDto.roleId
        }
      })
      let snap = await this.prismaService.role_permission.createMany({
        data: assignPermissionPayload
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Assigned successfully!", snap);
    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //remove the permission
  async removePermission(user: user, assingPermissionDto: AssignPermissionDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let assignPermissionPayload = [];

      //formatting the permission array
      assingPermissionDto.permissions.forEach(el => {
        assignPermissionPayload.push({
          permissionId: el
        });
      });

      log.info("success", logFormatter(logID, DATABASE_MSG, { msg: "Values send to db" }))

      let snap = await this.prismaService.role_permission.deleteMany({
        where: {
          OR: assignPermissionPayload,
          roleId: assingPermissionDto.roleId
        }
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Removed successfully!", snap);
    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }
}
