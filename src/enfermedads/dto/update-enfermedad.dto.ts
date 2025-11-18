import { PartialType } from '@nestjs/swagger';
import { CreateEnfermedadDto } from './create-enfermedad.dto';

export class UpdateEnfermedadDto extends PartialType(CreateEnfermedadDto) {}
