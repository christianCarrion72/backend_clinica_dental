import { Module } from '@nestjs/common';
import { ProcedimientosService } from './procedimientos.service';
import { ProcedimientosController } from './procedimientos.controller';
import { Procedimiento } from './entities/procedimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanTratamiento } from 'src/plan-tratamientos/entities/plan-tratamiento.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Procedimiento, PlanTratamiento]),
    AuthModule,
  ],
  controllers: [ProcedimientosController],
  providers: [ProcedimientosService],
  exports: [TypeOrmModule],
})
export class ProcedimientosModule {}
