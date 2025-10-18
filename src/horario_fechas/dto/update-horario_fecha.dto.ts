import { PartialType } from '@nestjs/swagger';
import { CreateHorarioFechaDto } from './create-horario_fecha.dto';

export class UpdateHorarioFechaDto extends PartialType(CreateHorarioFechaDto) {}
