import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    parentId: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isApproved: boolean;

}
