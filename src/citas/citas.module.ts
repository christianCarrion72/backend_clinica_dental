import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CalendarService } from './services/calendar.service';
import { GoogleController } from './controllers/google.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cita, Paciente, HorarioFecha]),
    AuthModule
  ],
  controllers: [CitasController, GoogleController],
  providers: [CitasService, CalendarService],
  exports: [TypeOrmModule]
})
export class CitasModule {}
