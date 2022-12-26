import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { winstonLogger } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { logId } from 'src/utils/logId.util';
import { REQUEST_MSG } from 'src/utils/helper.util';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createPermissionDto));
    return this.permissionService.create(createPermissionDto, logID);
  }

  @Get()
  findAll() {
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.permissionService.findAll(logID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.permissionService.findOne(+id, logID);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, updatePermissionDto));

    return this.permissionService.update(+id, updatePermissionDto, logID);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.permissionService.remove(+id);
  // }
}
