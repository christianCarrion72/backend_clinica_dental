import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateHistoriaClinicaDto {
  @ApiProperty({
    description: 'Fecha de ingreso',
    example: '2024-01-15',
  })
  @IsDate()
  @Type(() => Date)
  fechaIngreso: Date;

  @ApiProperty({
    description: 'Motivo de la consulta',
    example: 'Revisión dental general y limpieza',
  })
  @IsString()
  motivoConsulta: string;

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

  // Campos opcionales para el historial médico que se creará automáticamente

  @ApiProperty({
    description: 'Datos del examen bucal',
    example: [
      'Dientes en buen estado',
      'Encías saludables',
      'Higiene bucal regular',
    ],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  examenBucal?: string[] = [];
}
