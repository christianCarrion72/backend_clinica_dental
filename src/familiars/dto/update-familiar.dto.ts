import { PartialType } from '@nestjs/swagger';
import { CreateFamiliarDto } from './create-familiar.dto';

export class UpdateFamiliarDto extends PartialType(CreateFamiliarDto) {}
