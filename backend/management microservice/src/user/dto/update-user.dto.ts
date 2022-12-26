import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    firstname:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    lastname:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    password:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    roleId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    approverId:number;

    @ApiProperty()
    @IsOptional()
    isActive:boolean;

}
