import { Module } from '@nestjs/common';
import { HistorialMedicosService } from './historial-medicos.service';
import { HistorialMedicosController } from './historial-medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from './entities/historial-medico.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialMedico, HistoriaClinica]),
    AuthModule,
  ],
  controllers: [HistorialMedicosController],
  providers: [HistorialMedicosService],
  exports: [TypeOrmModule],
})
export class HistorialMedicosModule {}
