import { Module } from '@nestjs/common';
import { PlanTratamientosService } from './plan-tratamientos.service';
import { PlanTratamientosController } from './plan-tratamientos.controller';

@Module({
  controllers: [PlanTratamientosController],
  providers: [PlanTratamientosService],
})
export class PlanTratamientosModule {}
