import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @ApiProperty({
    description: 'Fecha de ingreso',
    example: '2023-01-01',
  })
  @IsDate()
  @Type(() => Date)
  fechaIngreso: Date;

  @ApiProperty({
    description: 'Motivo de la consulta',
    example: 'Consulta de seguimiento',
  })
  @IsString()
  motivoConsulta: string;

  @ApiProperty({
    description: 'ID del historial médico',
    example: 1,
  })
  @IsNumber()
  historialMedicoId: number;

  @ApiProperty({
    description: 'ID del paciente',
    example: 1,
  })
  @IsNumber()
  pacienteId: number;

  @ApiProperty({
    description: 'IDs de los dentistas',
    example: [1, 2, 3],
  })
  @IsNumber({}, { each: true })
  dentistas: number[];
}
