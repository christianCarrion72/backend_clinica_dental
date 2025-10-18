import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateHorarioFechaDto {
  @ApiProperty({
    description: 'Fecha concreta del horario (YYYY-MM-DD)',
    example: '2025-10-21',
  })
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    description: 'Indica si el horario está disponible para citas',
    example: true,
    default: true,
  })
  @IsBoolean()
  disponible: boolean;

  @ApiProperty({
    description: 'ID del horario base (relación con la tabla Horario)',
    example: 3,
  })
  @IsInt()
  horarioId: number;

  @ApiProperty({
    description: 'ID del dentista asignado a este horario',
    example: 2,
  })
  @IsInt()
  dentistaId: number;
}
