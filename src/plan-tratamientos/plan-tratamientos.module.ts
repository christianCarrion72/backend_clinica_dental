import { Module } from '@nestjs/common';
import { PlanTratamientosService } from './plan-tratamientos.service';
import { PlanTratamientosController } from './plan-tratamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanTratamiento } from './entities/plan-tratamiento.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanTratamiento, HistoriaClinica]),
    AuthModule,
  ],
  controllers: [PlanTratamientosController],
  providers: [PlanTratamientosService],
  exports: [TypeOrmModule],
})
export class PlanTratamientosModule {}
