import { Module } from '@nestjs/common';
import { HorarioFechasService } from './horario_fechas.service';
import { HorarioFechasController } from './horario_fechas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioFecha } from './entities/horario_fecha.entity';
import { Dentist } from 'src/users/entities/dentist.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioFecha, Dentist, Horario]),
    AuthModule,
  ],
  controllers: [HorarioFechasController],
  providers: [HorarioFechasService],
  exports: [TypeOrmModule],
})
export class HorarioFechasModule {}
