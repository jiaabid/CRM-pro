import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { filter } from 'rxjs';
import { logFormatter } from 'src/utils/format.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { logId } from 'src/utils/logId.util';
import { winstonLogger } from 'src/utils/winston.util';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { RejectApprovalDto } from './dto/reject-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Controller('approval')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) { }

  @Post("approve/:id")
  @UseGuards(AuthGuard('jwt'))
  approveItem(@Param('id') id: string, @Request() req) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, id));
    return this.approvalService.markApprove(req.user, +id, logID)
  }

  @Post("reject/:id")
  @UseGuards(AuthGuard('jwt'))
  rejectItem(@Param('id') id: string, @Request() req, @Body() rejectDto: RejectApprovalDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, rejectDto));
    return this.approvalService.markReject(req.user, +id, rejectDto, logID)
  }

  @Get(":filter")
  @UseGuards(AuthGuard('jwt'))
  getApprovals(@Param('filter') filter: string,@Request() req, @Query('type') type:any){
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG,{}));
    return this.approvalService.getApprovals(req.user, filter,type, logID) 
  }

}
