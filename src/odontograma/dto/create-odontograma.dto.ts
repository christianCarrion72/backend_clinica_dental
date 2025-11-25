import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsObject } from 'class-validator';

export class CreateOdontogramaDto {
  @ApiProperty({
    description: 'Contenido del odontograma en formato JSON (como cadena)',
    example: '{"dientes":[]}',
  })
  @IsObject()
  @IsNotEmpty()
  json: Record<string, any>;

  @ApiProperty({
    description: 'ID del paciente asociado',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  pacienteId: number;
}
