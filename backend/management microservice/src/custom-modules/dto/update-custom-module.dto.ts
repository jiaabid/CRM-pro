import { PartialType } from '@nestjs/swagger';
import { CreateCustomModuleDto } from './create-custom-module.dto';

export class UpdateCustomModuleDto extends PartialType(CreateCustomModuleDto) {}
