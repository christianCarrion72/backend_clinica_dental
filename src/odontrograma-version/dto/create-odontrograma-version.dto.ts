import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';

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
  @IsObject()
  @IsNotEmpty()
  json: Record<string, any>;

  @ApiProperty({
    description: 'ID del odontograma al que pertenece esta versión',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  odontogramaId: number;
}
