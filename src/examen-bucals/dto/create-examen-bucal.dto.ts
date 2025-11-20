import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExamenBucalDto {
  @ApiProperty({
    description: 'Dientes a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  dientes?: string;

  @ApiProperty({
    description: 'Encias a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  encia?: string;

  @ApiProperty({
    description: 'Higiene Bucal a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  higieneBucal?: string;

  @ApiProperty({
    description: 'Labios a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  labios?: string;

  @ApiProperty({
    description: 'Lengua a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  lengua?: string;

  @ApiProperty({
    description: 'Mucosa Bucal a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  mucosaBucal?: string;

  @ApiProperty({
    description: 'Oclusión a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  oclusion: string;

  @ApiProperty({
    description: 'Otros Datos a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  otrosDatos?: string;

  @ApiProperty({
    description: 'Paladar a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  paladar?: string;

  @ApiProperty({
    description: 'Piso Boca a examinar',
    example: '1-2-3-4-5-6-7-8',
  })
  @IsString()
  @IsOptional()
  pisoBoca?: string;

  @ApiProperty({
    description: 'ID de la historia clínica',
    example: 1,
  })
  @IsNumber()
  historiaClinicaId: number;
}
