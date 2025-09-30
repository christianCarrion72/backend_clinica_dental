import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstadoCivilDto {
    @ApiProperty({ description: 'Descripción del estado civil', example: 'Soltero' })
    @IsString()
    @Length(1, 50)
    descripcion: string;
}