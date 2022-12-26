import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { RoleModule } from "./role/role.module"
import { initWinston } from './utils/winston.util';
import {ValidationPipe} from '@nestjs/common'
import { init } from './utils/initScript.util';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';
import { ApprovalModule } from './approval/approval.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import * as bodyparser from 'body-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initWinston()
  //swagger config
  const config = new DocumentBuilder()
    .setTitle("CRM 2.0")
    .setDescription("CRM 2.0 API Documentation")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [RoleModule,PermissionModule,UserModule,ApprovalModule,AuthModule,DepartmentModule],
    
  });
  SwaggerModule.setup("docs", app, document);
  //-- config end --

  //middlewares
  app.useGlobalPipes(new ValidationPipe({
    transform:true
  }))
  app.enableCors({
    origin:"*"
  })
  
  app.use(bodyparser.urlencoded({extended:true}))
  await app.listen(4001,async ()=>{
   await init()
  });
}
bootstrap();
