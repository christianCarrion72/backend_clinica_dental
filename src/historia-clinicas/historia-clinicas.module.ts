import { Module } from '@nestjs/common';
import { HistoriaClinicasService } from './historia-clinicas.service';
import { HistoriaClinicasController } from './historia-clinicas.controller';

@Module({
  controllers: [HistoriaClinicasController],
  providers: [HistoriaClinicasService],
})
export class HistoriaClinicasModule {}
