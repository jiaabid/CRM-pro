import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[PrismaModule],
  controllers: [ApprovalController],
  providers: [ApprovalService],
  exports:[ApprovalService]
})
export class ApprovalModule {}
