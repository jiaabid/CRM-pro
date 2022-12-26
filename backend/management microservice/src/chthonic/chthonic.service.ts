import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChthonicDto } from './dto/create-chthonic.dto';
import { UpdateChthonicDto } from './dto/update-chthonic.dto';
import { winstonLogger as log } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { customError, customResponse, DATABASE_MSG, ERROR_MSG, RESPONSE_MSG } from 'src/utils/helper.util';
import { APIChthonicDto } from './dto/api-chthonic.dto';
import { HttpService } from "@nestjs/axios/dist"
import { CreateFieldDto } from './dto/field-chthonic.dto';
@Injectable()
export class ChthonicService {
  constructor(private readonly prismaService: PrismaService,
    private readonly httpService: HttpService) { }

  private axiosInstance = this.httpService.axiosRef

  //create the datasource for the data 
  async create(createChthonicDto: CreateChthonicDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createChthonicDto));
      let snap = await this.prismaService.api.create({
        data: createChthonicDto
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //create the fields for the api
  async createFields(createFieldDto: CreateFieldDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, createFieldDto));
      let snap = await this.prismaService.fields.createMany({
        data: createFieldDto.fields
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //retrieve the fields for dynamic UI
  async getFields(apiDto: APIChthonicDto, logID: string) {
    try {
      log?.info("success", logFormatter(logID, DATABASE_MSG, apiDto));
      let snap = await this.prismaService.api.findFirst({
        where: {
          isDeleted: false,
          // moduleId: apiDto.moduleId,
          name: apiDto.name
        },
        include: {
          requestMethod: true,
          fields: true

        }
      });

      log.info("success", logFormatter(logID, RESPONSE_MSG, snap))
      return new customResponse("Created successfully!", snap);

    } catch (err) {

      log?.error("failure", logFormatter(logID, ERROR_MSG, err));
      return new customError(err).error()
    }
  }

  //call the third party API
  async requester(apiDto: APIChthonicDto, logID: string) {
    const exisiting = await this.prismaService.api.findFirst({
      where: {
        isDeleted: false,
        // moduleId: apiDto.moduleId,
        name: apiDto.name
      },
      include: {
        requestMethod: true,
        fields: true
      }
    });
    
    let response;
    if (this.validateFields(exisiting.fields, apiDto.requestBody)) {
      if (exisiting.requestMethod.value.toLowerCase() == 'post') {
        response = await this.axiosInstance.post(exisiting.url, apiDto.requestBody)
      }else{
        response = await this.axiosInstance.get(exisiting.url)

      }
      return new customResponse("Retrieved successfully!", {
        responseFields: exisiting.fields,
        responseData: response.data
      })
    }

  }

  //validate the request body
  private validateFields(existingFields: any, requestBody: any) {
    const requestedKeys = Object.keys(requestBody);
    const exisitingKeys = Object.keys(existingFields);
    console.log(requestedKeys, exisitingKeys)
    let boolCount = 0;
    requestedKeys.forEach(key => {
      if (existingFields.find(el => el.name == key)) {
        boolCount++;
      }
    })
    if (boolCount == requestedKeys.length) {
      return true;
    }
    else {
      return false;
    }
  }

}
