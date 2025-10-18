import { IsString, IsDate, IsNumber, IsOptional, Length, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDto {
    @ApiProperty({ description: 'Nombre completo del paciente', example: 'Juan Pérez' })
    @IsString()
    @Length(1, 100)
    nombre: string;

    @ApiProperty({ description: 'Fecha de nacimiento', example: '1990-01-01' })
    @IsDate()
    @Type(() => Date)
    fecha_nacimiento: Date;

    @ApiProperty({ description: 'Edad del paciente (opcional)', required: false, example: 30 })
    @IsOptional()
    @IsNumber()
    edad?: number;

    @ApiProperty({ description:'Correo del paciente', example: 'paciente1@gmail.com' })
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'ID del estado civil', example: 1 })
    @IsNumber()
    estado_civil_id: number;

    @ApiProperty({ description: 'Ocupación del paciente (opcional)', required: false, example: 'Ingeniero' })
    @IsOptional()
    @IsString()
    @Length(1, 100)
    ocupacion?: string;

    @ApiProperty({ description: 'Teléfono fijo (opcional)', required: false, example: '3351234' })
    @IsOptional()
    @IsString()
    @Length(1, 20)
    telefono?: string;

    @ApiProperty({ description: 'Número de celular', example: '71234567' })
    @IsString()
    @Length(1, 20)
    celular: string;
}