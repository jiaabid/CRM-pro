import { Module } from '@nestjs/common';
import { CustomModulesService } from './custom-modules.service';
import { CustomModulesController } from './custom-modules.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CustomModulesController],
  providers: [CustomModulesService]
})
export class CustomModulesModule {}
