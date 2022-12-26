import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customError, customResponse } from 'src/utils/helper.util';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService,
    private readonly jwt: JwtService) { }

  //user login 
  async login(createAuthDto: CreateAuthDto, logID: string) {
    // console.log(createAuthDto)
    let email = createAuthDto.email
    const existing = await this.prismaService.user.findFirst({
      where: {
        email
      },
      //retrieve with the role and permissions
      include:{
        role:{
          include:{
            permissions:{
              include:{
                permission:true
              }
            }
          }
         
        }
      }
    })
    if (existing) {
      //uncomment later
      // if(existing.isLogged){
      //   return new customError("Your account is already logged in, logout from other devices!")
          
      // }
      if (!existing.isActive) {
        return new customError("Your account is deactivated!")
      }
      let isPassword = await compare(createAuthDto.password, existing.password)
      if (!isPassword) {
        return new customError("Invalid Password").error()
      }

      let token = await this.jwt.signAsync({
        sub: existing.id,
        email: existing.email
      }, {
        secret: 'crm'
      });

      //update the user login status and time
     await this.prismaService.user.update({
        where:{
          id:existing.id
        },
        data:{
          isLogged:true,
          lastLoginAt: new Date()
        }
      });
      return new customResponse("Logged in successfully", {
        token,
        user: existing
      })
    }
    return new customError("Invalid Email").error()
  }

  //validate the user
  async validateByEmail(email: string, logID: string) {
    const existing = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })
    if (existing) {
      if (!existing.isActive) {
        return new customError("Your account is deactivated!")
      }
      delete existing.password
      return new customResponse("Email validated successfully!", {

        isValid: true,
        user: existing
      })
    }
    return new customError("Invalid Email").error()
  }

  //logout
  async logout(user:user,logID:string){
        const existing = await this.prismaService.user.findUnique({
          where:{
            id:user.id
          }
        })
        if(existing){
           console.log(existing)
           await this.prismaService.user.update({
            where:{
              id: existing.id
            },
            data:{
              isLogged:false
            }
           })
           return new customResponse("Loggout successfully",{})
        }
  }
}
