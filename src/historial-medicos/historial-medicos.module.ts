import { Module } from '@nestjs/common';
import { HistorialMedicosService } from './historial-medicos.service';
import { HistorialMedicosController } from './historial-medicos.controller';

@Module({
  controllers: [HistorialMedicosController],
  providers: [HistorialMedicosService],
})
export class HistorialMedicosModule {}
