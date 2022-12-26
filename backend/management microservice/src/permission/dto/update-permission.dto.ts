import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsOptional()
    canView: boolean;

    @ApiProperty()
    @IsOptional()
    canAdd: boolean;

    @ApiProperty()
    @IsOptional()
    canUpdate: boolean;

    @ApiProperty()
    @IsOptional()
    canDelete: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isApproved: boolean;
    
    
}
