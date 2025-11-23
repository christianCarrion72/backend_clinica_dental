import { ApiProperty } from '@nestjs/swagger';

export class PlanTratamientoAIDto {
  @ApiProperty({ description: 'Diagnóstico del tratamiento' })
  diagnosticoTratamiento: string;

  @ApiProperty({ description: 'Estado del tratamiento' })
  estado: string;

  @ApiProperty({ description: 'Pieza dental afectada' })
  pieza: string;

  @ApiProperty({ description: 'Precio del tratamiento' })
  precio: number;
}

export class ProcedimientoAIDto {
  @ApiProperty({ description: 'Trabajo realizado' })
  trabajoRealizado: string;

  @ApiProperty({ description: 'Próxima cita', required: false })
  proximaCita?: string;

  @ApiProperty({ description: 'Índice del plan de tratamiento asociado' })
  planIndex: number;
}

export class AudioAnalysisResponseDto {
  @ApiProperty({ type: [PlanTratamientoAIDto] })
  planesTratamiento: PlanTratamientoAIDto[];

  @ApiProperty({ type: [ProcedimientoAIDto] })
  procedimientos: ProcedimientoAIDto[];
}

export class ErrorResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error?: string;
}
