import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateRoleDto  {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    parentId?:number;
    
}
