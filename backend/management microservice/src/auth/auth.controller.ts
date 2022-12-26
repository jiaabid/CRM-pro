import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { logFormatter } from 'src/utils/format.util';
import { REQUEST_MSG } from 'src/utils/helper.util';
import { logId } from 'src/utils/logId.util';
import { winstonLogger } from 'src/utils/winston.util';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() createAuthDto: CreateAuthDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createAuthDto));
    return this.authService.login(createAuthDto,logID);
  }

  @Post('/validate')
  validateByEmail(  @Body('email') email: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, email));
    return this.authService.validateByEmail(email,logID);
  }
  
  @Get("/logout")
  @UseGuards(AuthGuard('jwt'))
  logout(@Request() req){
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.authService.logout(req.user,logID);
  }
}
