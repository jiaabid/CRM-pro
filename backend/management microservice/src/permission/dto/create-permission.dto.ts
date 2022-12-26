import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    canView: boolean;

    @ApiProperty()
    canAdd: boolean;

    @ApiProperty()
    canUpdate: boolean;

    @ApiProperty()
    canDelete: boolean;
}
