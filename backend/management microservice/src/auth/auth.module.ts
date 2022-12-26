import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports:[JwtModule.register({}),PrismaModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}