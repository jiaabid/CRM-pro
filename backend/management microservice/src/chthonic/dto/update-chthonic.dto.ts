import { PartialType } from '@nestjs/swagger';
import { CreateChthonicDto } from './create-chthonic.dto';

export class UpdateChthonicDto extends PartialType(CreateChthonicDto) {}
