import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  consultorio: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsInt()
  @IsNotEmpty()
  pacienteId: number;

  @IsInt()
  @IsNotEmpty()
  horarioFechaId: number;
}
