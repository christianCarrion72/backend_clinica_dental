import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePlanTratamientoDto {
  @ApiProperty({
    description: 'Diagnostico del tratamiento',
    example: 'Dolor de cabeza',
  })
  @IsString()
  diagnosticoTratamiento: string;

  @ApiProperty({
    description: 'Estado del plan de tratamiento',
    example: 'Activo',
  })
  @IsString()
  estado: string;

  @ApiProperty({
    description: 'Fecha del plan de tratamiento',
    example: '2023-01-01',
  })
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @ApiProperty({
    description: 'Pieza del plan de tratamiento',
    example: 'Pieza 1',
  })
  @IsString()
  pieza: string;

  @ApiProperty({
    description: 'Precio del plan de tratamiento',
    example: 1000,
  })
  @IsNumber()
  precio: number;

  @ApiProperty({
    description: 'ID de la historia clínica',
    example: 1,
  })
  @IsNumber()
  historiaClinicaId: number;
}
