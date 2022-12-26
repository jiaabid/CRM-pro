import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDbVariableDto } from './dto/create-db-variable.dto';
// import { UpdateDbVariableDto } from './dto/update-db-variable.dto';
import { CreateDbVariableDetailDto } from './dto/create-db-variableDetail.dto';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';
import { winstonLogger as log } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';

@Injectable()
export class DbVariableService {
constructor(private readonly prismaService:PrismaService){}


  async create(createDbVariableDto: CreateDbVariableDto,logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createDbVariableDto));
      let snap = await this.prismaService.dbVariable.create({
        data: createDbVariableDto
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //get all dbVariables
  async findAll(logID: String) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.dbVariable.findMany()
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))

      return new customResponse("Retrieved successfully!", snap);


    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }

  //get particular dbVariable
  async findOne(id: number, logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.dbVariable.findUnique({
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

  //get particular dbVariable by name
  async findOneByName(name: string, logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.dbVariable.findFirst({
        where: {
          name:name
        },
        include:{
          variableDetail:true
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Retrieved successfully!", snap);
    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }


  //create the variable detail
  async createVariableDetail(createDbVariableDto: CreateDbVariableDetailDto,logID:string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createDbVariableDto));
      let snap = await this.prismaService.dbVariableDetail.create({
        data: createDbVariableDto
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  
  
}
