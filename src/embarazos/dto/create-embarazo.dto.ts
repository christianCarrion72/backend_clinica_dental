import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber } from 'class-validator';

export class CreateEmbarazoDto {
  @ApiProperty({
    description: '¿Utiliza anticonceptivo?',
    example: true,
  })
  @IsBoolean()
  anticonceptivo: boolean;

  @ApiProperty({
    description: '¿Está embarazada?',
    example: true,
  })
  @IsBoolean()
  estaEmbarazada: boolean;

  @ApiProperty({
    description: 'ID del historial médico',
    example: 1,
  })
  @IsNumber()
  historialMedicoId: number;
}
