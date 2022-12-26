import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { winstonLogger } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { logId } from 'src/utils/logId.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import {AuthGuard} from "@nestjs/passport";


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req,@Body() createRoleDto: CreateRoleDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createRoleDto));
    let response = this.roleService.create(req.user,createRoleDto, logID);
    console.log(response);
    return response;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.roleService.findAll(logID);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.roleService.findOne(+id, logID);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req,@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.roleService.update(req.user,+id, updateRoleDto,logID);
  }

  @Post("assign")
  @UseGuards(AuthGuard('jwt'))
  assignPermission(@Request() req,@Body() assingPermissionDto:AssignPermissionDto){
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.roleService.assignPermission(req.user,assingPermissionDto,logID);
  }

  @Post("remove")
  @UseGuards(AuthGuard('jwt'))
  removePermission(@Request() req,@Body() assingPermissionDto:AssignPermissionDto){
    const logID = logId;
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.roleService.removePermission(req.user,assingPermissionDto,logID);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
