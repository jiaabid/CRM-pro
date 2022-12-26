import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { winstonLogger } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { logId } from 'src/utils/logId.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { AuthGuard } from '@nestjs/passport';

@Controller('department')
@UseGuards(AuthGuard('jwt'))
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto,@Request() req) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createDepartmentDto));
    return this.departmentService.create(req.user,createDepartmentDto,logID);
  }
  
  @Get()
  findAll() {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.departmentService.findAll(logID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.departmentService.findOne(+id,logID);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req,@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, updateDepartmentDto));
    return this.departmentService.update(req.user,+id, updateDepartmentDto,logID);
  }

}
