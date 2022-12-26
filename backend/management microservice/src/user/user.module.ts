import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ApprovalModule } from 'src/approval/approval.module';

@Module({
  imports:[PrismaModule,ApprovalModule],
  controllers: [UserController],
  providers: [UserService],
  // exports:[UserService]
})
export class UserModule {}
