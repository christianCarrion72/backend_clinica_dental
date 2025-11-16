import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  cargo?: string;
}
