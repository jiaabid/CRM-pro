import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDbVariableDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string
}
