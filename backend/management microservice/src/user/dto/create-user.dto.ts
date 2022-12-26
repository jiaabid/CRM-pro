import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    firstname:string;
    
    @ApiProperty()
    @IsNotEmpty()
    lastname:string;

    @ApiProperty()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    password:string;

    @ApiProperty()
    @IsNotEmpty()
    isActive:boolean;

    @ApiProperty()
    @IsNotEmpty()
    roleId:number;

    @ApiProperty()
    // @IsNotEmpty()
    deptId:number;

    @ApiProperty()
    // @IsNotEmpty()
    approverId:number;

    @ApiProperty()
    @IsNotEmpty()
    title:string;
    
    // @ApiProperty()
    // @IsNotEmpty()
    // photo:string;

    @ApiProperty()
    address:string;

    @ApiProperty()
    contact:string;

    // @ApiProperty()
    // status:boolean;

    @ApiProperty()
    city:string;

    @ApiProperty()
    region:string;

    
    @ApiProperty()
    country:string;

    
    @ApiProperty()
    postalCode:string;

    
    @ApiProperty()
    description:string;
}
