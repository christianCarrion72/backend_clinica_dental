import { Module } from '@nestjs/common';
import { HistoriaClinicasService } from './historia-clinicas.service';
import { HistoriaClinicasController } from './historia-clinicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica])],
  controllers: [HistoriaClinicasController],
  providers: [HistoriaClinicasService],
  exports: [TypeOrmModule],
})
export class HistoriaClinicasModule {}
