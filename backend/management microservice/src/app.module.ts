import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { PermissionModule } from './permission/permission.module';
import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';
import { ApprovalModule } from './approval/approval.module';
import { AuthModule } from './auth/auth.module';
import { DbVariableModule } from './db-variable/db-variable.module';
import { CustomModulesModule } from './custom-modules/custom-modules.module';
import { ChthonicModule } from './chthonic/chthonic.module';


@Module({
  imports: [ PrismaModule, ApprovalModule,RoleModule, PermissionModule, DepartmentModule, UserModule, AuthModule, DbVariableModule, CustomModulesModule, ChthonicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
