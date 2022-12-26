import { Module } from '@nestjs/common';
import { DbVariableService } from './db-variable.service';
import { DbVariableController } from './db-variable.controller';
import {PrismaModule} from '../prisma/prisma.module'
@Module({
  imports:[PrismaModule],
  controllers: [DbVariableController],
  providers: [DbVariableService]
})
export class DbVariableModule {}
