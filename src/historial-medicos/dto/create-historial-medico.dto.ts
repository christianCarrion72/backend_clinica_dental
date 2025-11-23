import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistorialMedicoDto {
  @ApiProperty({
    description: '¿Tiene alergia?',
    example: true,
  })
  @IsBoolean()
  alergia: boolean;

  @ApiProperty({
    description: '¿Fuma?',
    example: true,
  })
  @IsBoolean()
  fuma: boolean;

  @ApiProperty({
    description: 'Nombre de las alergias',
    example: 'Penicilina',
  })
  @IsString()
  @IsOptional()
  nombreAlergias?: string;

  @ApiProperty({
    description: 'Nombre del tratamiento',
    example: 'Antibiótico',
  })
  @IsString()
  @IsOptional()
  nombreTratamiento?: string;

  @ApiProperty({
    description: 'Otras enfermedades',
    example: 'Gripe',
  })
  @IsString()
  @IsOptional()
  otrasEnfermedades?: string;

  @ApiProperty({
    description: '¿Tratamiento activo?',
    example: true,
  })
  @IsBoolean()
  tratamientoActivo: boolean;

  @ApiProperty({
    description: 'Fecha de la última consulta',
    example: '2023-01-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  ultimaConsulta?: Date;

  @ApiProperty({
    description: 'ID de la historia clínica',
    example: 1,
  })
  @IsNumber()
  historiaClinicaId: number;

  @ApiProperty({
    description: 'Lista de enfermedades',
    example: ['Diabetes', 'Hipertensión'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  enfermedades?: string[];
}
