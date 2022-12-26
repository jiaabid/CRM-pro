import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { logFormatter } from 'src/utils/format.util';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { user } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) { }

  //create a department
  async create(user:user,createDepartmentDto: CreateDepartmentDto , logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createDepartmentDto));
      createDepartmentDto['createdBy'] = user.id
      let snap = await this.prismaService.department.create({
        data: createDepartmentDto
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //get all departments
 async findAll(logID: String) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.department.findMany({
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

  //get particular department
  async findOne(id: number, logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.department.findUnique({
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

  //update the department
  async update(user:user,id: number, updateDepartmentDto: UpdateDepartmentDto, logID:string) {
    let existing = await this.prismaService.department.findUnique({
      where: {
        id
      }
    })

    if (existing) {
      //updating the values against the keys
      Object.keys(updateDepartmentDto).forEach(key => {
        if (key == 'isDeleted') {
          existing[key] = updateDepartmentDto[key]
          return existing['deletedAt'] = new Date();
        } else if (key == 'isApproved') {
          existing[key] = updateDepartmentDto[key]
          return existing['deletedAt'] = new Date();
        }
        existing[key] = updateDepartmentDto[key]
      })

      existing['updatedAt'] = new Date();
existing['updatedBy'] = user.id
      try {
        log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
         
        delete existing.id; //delete id as primary key cant be updated
        //update the entry
        let snap = await this.prismaService.department.update({
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
