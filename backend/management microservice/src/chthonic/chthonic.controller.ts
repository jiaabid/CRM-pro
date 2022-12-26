import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChthonicService } from './chthonic.service';
import { CreateChthonicDto } from './dto/create-chthonic.dto';
import { UpdateChthonicDto } from './dto/update-chthonic.dto';
import { logFormatter } from 'src/utils/format.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { logId } from 'src/utils/logId.util';
import { winstonLogger } from 'src/utils/winston.util';
import { APIChthonicDto } from './dto/api-chthonic.dto';
import { CreateFieldDto } from './dto/field-chthonic.dto';

@Controller('chthonic')
export class ChthonicController {
  constructor(private readonly chthonicService: ChthonicService) {}

  @Post()
  create(@Body() createChthonicDto: CreateChthonicDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createChthonicDto));
    return this.chthonicService.create(createChthonicDto,logID);
  }


  @Post('request')
  requester(@Body() apiDto: APIChthonicDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, apiDto));
    return this.chthonicService.requester(apiDto,logID);
  }

  @Post('fields')
  getFields(@Body() apiDto: APIChthonicDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, apiDto));
    return this.chthonicService.getFields(apiDto,logID);
  }


  @Post('fields/create')
  createFields(@Body() fieldDto: CreateFieldDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, fieldDto));
    console.log(fieldDto)
    return this.chthonicService.createFields(fieldDto,logID);
  }
  
}
