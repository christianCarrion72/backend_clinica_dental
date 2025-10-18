import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EstadoCivil } from 'src/estado_civils/entities/estado_civil.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, EstadoCivil]),
    AuthModule
  ],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [TypeOrmModule]
})
export class PacientesModule {}
