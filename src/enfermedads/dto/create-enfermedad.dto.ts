import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class CreateEnfermedadDto {
  @ApiProperty({
    description: 'Nombre de la enfermedad',
    example: 'Gripe',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'IDs de los historiales médicos',
    example: [1, 2, 3],
  })
  @IsNumber({}, { each: true })
  historialesMedicos: number[];
}
