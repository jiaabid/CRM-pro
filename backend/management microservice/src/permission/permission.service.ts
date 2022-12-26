import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createPermissionDto: CreatePermissionDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createPermissionDto));
      let snap = await this.prismaService.permission.create({
        data: createPermissionDto
      });
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  async findAll(logID: String) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.permission.findMany({
        where:{
          isDeleted:false
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))

      return new customResponse("Retrieved successfully!", snap);


    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }

  async findOne(id: number, logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.permission.findUnique({
        where: {
          id
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Retrieved successfully!", snap);
    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto, logID:string) {
    let existing = await this.prismaService.permission.findUnique({
      where: {
        id
      }
    })
    console.log(existing)
    if (existing) {

      //updating the values against the keys
      Object.keys(updatePermissionDto).forEach(key => {
        if (key == 'isDeleted') {
          existing[key] = updatePermissionDto[key]
          return existing['deletedAt'] = new Date();
        } else if (key == 'isApproved') {
          existing[key] = updatePermissionDto[key]
          return existing['deletedAt'] = new Date();
        }
        existing[key] = updatePermissionDto[key]
      })

      existing['updatedAt'] = new Date();

      try {
        log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
         
        delete existing.id; //delete id as primary key cant be updated
        //update the entry
        let snap = await this.prismaService.permission.update({
          where: {
            id
          },
          data: existing
        });

        log.info("success", logFormatter(logID, RESPONSE_MSG, snap));
        return new customResponse("Created successfully!", snap);

      } catch (err) {

        log?.error("failure", logFormatter(logID, ERROR_MSG, err));
        return new customError(err).error()
      }
    }
    return new customError("Not Found").error()
  }

}
