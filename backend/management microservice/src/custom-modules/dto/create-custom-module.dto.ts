import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCustomModuleDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    // @ApiProperty()
    // @IsNotEmpty()
    // moduleTypeId:number;
}
