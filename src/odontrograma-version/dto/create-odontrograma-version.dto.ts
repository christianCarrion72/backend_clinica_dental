import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOdontrogramaVersionDto {
  @ApiProperty({
    description: 'Nombre de la versión del odontograma',
    example: 'Inicial',
  })
  @IsString()
  @IsNotEmpty()
  nombreVersion: string;

  @ApiProperty({
    description: 'Contenido de la versión en JSON (como cadena)',
    example: '{"dientes":[]}',
  })
  @IsString()
  @IsNotEmpty()
  json: string;

  @ApiProperty({
    description: 'ID del odontograma al que pertenece esta versión',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  odontogramaId: number;
}
