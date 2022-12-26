import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDbVariableDetailDto {
    @ApiProperty()
    @IsNotEmpty()
    value:string

    @ApiProperty()
    variableId: number
}
