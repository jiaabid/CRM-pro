import { Module } from '@nestjs/common';
import { ChthonicService } from './chthonic.service';
import { ChthonicController } from './chthonic.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[PrismaModule,HttpModule],
  controllers: [ChthonicController],
  providers: [ChthonicService]
})
export class ChthonicModule {}
