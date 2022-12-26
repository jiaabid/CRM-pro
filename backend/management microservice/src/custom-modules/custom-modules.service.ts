import { Injectable } from '@nestjs/common';
import { CreateCustomModuleDto } from './dto/create-custom-module.dto';
import { UpdateCustomModuleDto } from './dto/update-custom-module.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { logFormatter } from 'src/utils/format.util';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';

@Injectable()
export class CustomModulesService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createCustomModuleDto: CreateCustomModuleDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createCustomModuleDto));
      //check if module exists 
      let existing = await this.prismaService.modules.findFirst({
        where: {
          name: createCustomModuleDto.name
        }
      })
      if (existing) {
        return new customError("Module Already exist").error()
      }
      //get the module id
      let moduleId = await this.prismaService.dbVariableDetail.findFirst({
        where: {
          "value": "dynamic"
        }
      })
      createCustomModuleDto['moduleTypeId'] = moduleId.id;
      let snap = await this.prismaService.modules.create({
        data: createCustomModuleDto
      });
      let getSnap = await this.prismaService.modules.findFirst({
        where:{
          id: snap.id
        },
        include:{
          moduleType:true
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, getSnap))
      return new customResponse("Created successfully!", getSnap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  async findAll(logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.modules.findMany({
        include: {
          moduleType: true
        }
      })
      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))

      return new customResponse("Retrieved successfully!", snap);


    } catch (err) {
      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()

    }
  }

  async findOne(id: number, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, {}));
      let snap = await this.prismaService.modules.findUnique({
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

}
