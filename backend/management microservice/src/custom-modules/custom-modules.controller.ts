import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomModulesService } from './custom-modules.service';
import { CreateCustomModuleDto } from './dto/create-custom-module.dto';
import { UpdateCustomModuleDto } from './dto/update-custom-module.dto';
import { logFormatter } from 'src/utils/format.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { logId } from 'src/utils/logId.util';
import { winstonLogger } from 'src/utils/winston.util';

@Controller('custom-modules')
export class CustomModulesController {
  constructor(private readonly customModulesService: CustomModulesService) {}

  @Post()
  create(@Body() createCustomModuleDto: CreateCustomModuleDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createCustomModuleDto));
    return this.customModulesService.create(createCustomModuleDto,logID);
  }

  @Get()
  findAll() {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.customModulesService.findAll(logID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.customModulesService.findOne(+id,logID);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomModuleDto: UpdateCustomModuleDto) {
  //   return this.customModulesService.update(+id, updateCustomModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customModulesService.remove(+id);
  // }
}
