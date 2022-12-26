import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
   
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isApproved: boolean;
}
