import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

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

    @ApiProperty()
    status:number;

    @ApiProperty()
    city:number;

    @ApiProperty()
    region:number;

    
    @ApiProperty()
    country:number;

    
    @ApiProperty()
    postalCode:number;

    
    @ApiProperty()
    description:number;
}
