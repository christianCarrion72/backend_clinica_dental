import { IsString, IsNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamiliarDto {
  @ApiProperty({ description: 'ID del paciente asociado', example: 1 })
  @IsNumber()
  paciente_id: number;

  @ApiProperty({
    description: 'Nombre completo del familiar',
    example: 'María Pérez',
  })
  @IsString()
  @Length(1, 100)
  nombre: string;

  @ApiProperty({
    description: 'Parentesco con el paciente',
    example: 'madre',
    enum: ['madre', 'padre', 'tutor'],
  })
  @IsString()
  @Length(1, 50)
  parentesco: string;

  @ApiProperty({
    description: 'Número de celular del familiar',
    example: '71234567',
  })
  @IsString()
  @Length(1, 20)
  celular: string;
}
