import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../users/entities/rol.entity';
import { User } from '../../users/entities/user.entity';
import { InitialSeeder } from './initial.seeder';
import { ConfigModule } from '@nestjs/config';
import { Dentist } from 'src/users/entities/dentist.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Cita } from 'src/citas/entities/cita.entity';
import { EstadoCivil } from 'src/estado_civils/entities/estado_civil.entity';
import { Familiar } from 'src/familiars/entities/familiar.entity';
import { Administrative } from 'src/users/entities/administrative.entity';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import { HistorialMedico } from 'src/historial-medicos/entities/historial-medico.entity';
import { PlanTratamiento } from 'src/plan-tratamientos/entities/plan-tratamiento.entity';
import { Enfermedad } from 'src/enfermedads/entities/enfermedad.entity';
import { Procedimiento } from 'src/procedimientos/entities/procedimiento.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    }),
    TypeOrmModule.forFeature([
      Role,
      User,
      Dentist,
      HorarioFecha,
      Horario,
      Paciente,
      Cita,
      EstadoCivil,
      Familiar,
      Administrative,
      HistoriaClinica,
      HistorialMedico,
      PlanTratamiento,
      Enfermedad,
      Procedimiento,
    ]),
  ],
  providers: [InitialSeeder],
  exports: [InitialSeeder],
})
export class SeederModule {}
