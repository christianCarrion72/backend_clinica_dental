import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProcedimientoDto {
  @ApiProperty({
    description: 'Fecha del procedimiento',
    example: '2023-01-01',
  })
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @ApiProperty({
    description: 'Fecha de la proxima cita',
    example: '2023-01-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  proximaCita?: Date;

  @ApiProperty({
    description: 'Trabajo realizado en el procedimiento',
    example: 'Consulta general',
  })
  @IsString()
  trabajoRealizado: string;

  @ApiProperty({
    description: 'ID del plan de tratamiento',
    example: 1,
  })
  @IsPositive()
  @IsNumber()
  planTratamientoId: number;
}
