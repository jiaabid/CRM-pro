import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AssignPermissionDto {

    @IsNotEmpty()
    @ApiProperty()
    roleId: number;


    @ApiProperty()
    @IsNotEmpty()
    permissions: PermissionDto[];
}

class PermissionDto {
    @ApiProperty()
    permissionId: number;
    @ApiProperty()
    canAdd: boolean;
    @ApiProperty()
    canView: boolean;
    @ApiProperty()
    canRemove: boolean;
    @ApiProperty()
    canUpdate: boolean;
}
