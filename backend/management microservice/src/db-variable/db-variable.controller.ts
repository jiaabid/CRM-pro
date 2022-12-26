import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DbVariableService } from './db-variable.service';
import { CreateDbVariableDto } from './dto/create-db-variable.dto';
import { CreateDbVariableDetailDto } from './dto/create-db-variableDetail.dto';
import { winstonLogger } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { logId } from 'src/utils/logId.util';
import { REQUEST_MSG } from 'src/utils/helper.util';

@Controller('db-variable')
export class DbVariableController {
  constructor(private readonly dbVariableService: DbVariableService) {}

  @Post()
  create(@Body() createDbVariableDto: CreateDbVariableDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createDbVariableDto));
    return this.dbVariableService.create(createDbVariableDto,logID);
  }

  @Get()
  findAll() {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.dbVariableService.findAll(logID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.dbVariableService.findOne(+id,logID);
  }

  @Get('detail/:name')
  findOneByName(@Param('name') name: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.dbVariableService.findOneByName(name,logID);
  }

  @Post('detail')
  createVariableDetail(@Body() createDbVariableDetailDto: CreateDbVariableDetailDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createDbVariableDetailDto));
    return this.dbVariableService.createVariableDetail(createDbVariableDetailDto,logID);
  }

}
