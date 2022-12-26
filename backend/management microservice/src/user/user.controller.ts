import { Controller, Get, Post, Body, Patch, Param, UseGuards,Request,UseInterceptors,UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { winstonLogger } from 'src/utils/winston.util';
import { logFormatter } from 'src/utils/format.util';
import { logId } from 'src/utils/logId.util';
import { REQUEST_MSG ,customResponse} from 'src/utils/helper.util';
import { LoginDto } from './dto/login.dto';
import {AuthGuard} from "@nestjs/passport";
import { diskStorage} from 'multer'
import {extname} from 'path'
// import {Request as request} from 'express'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: CreateUserDto,@Request() req) {
   console.log(req.user)
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, createUserDto));
    return this.userService.create(req.user,createUserDto,logID);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.userService.findAll(logID);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
    return this.userService.findOne(+id, logID);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, updateUserDto));
    return this.userService.update(req.user,+id, updateUserDto, logID);
  }

  @Post("upload/:id")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./images',
      filename:(req:any,file:any,cb:any)=>{
        console.log(file.originalname)
        cb(null,`${file.originalname}${extname(file.originalname)}`)
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File,@Request() req,@Param('id') id:number) {
    console.log(file);
    const logID = logId
    winstonLogger.info("success", logFormatter(logID, REQUEST_MSG, {}));
   return this.userService.uploadDp(req.user,id,`/images/${file.originalname}`,logID)

  }
}
