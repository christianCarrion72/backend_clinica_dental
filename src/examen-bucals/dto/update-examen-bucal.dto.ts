import { PartialType } from '@nestjs/swagger';
import { CreateExamenBucalDto } from './create-examen-bucal.dto';

export class UpdateExamenBucalDto extends PartialType(CreateExamenBucalDto) {}
