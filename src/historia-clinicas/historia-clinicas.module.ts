import { Module } from '@nestjs/common';
import { HistoriaClinicasService } from './historia-clinicas.service';
import { HistoriaClinicasController } from './historia-clinicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Dentist } from 'src/users/entities/dentist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Paciente, Dentist])],
  controllers: [HistoriaClinicasController],
  providers: [HistoriaClinicasService],
  exports: [TypeOrmModule],
})
export class HistoriaClinicasModule {}
