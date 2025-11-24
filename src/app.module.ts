import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { FamiliarsModule } from './familiars/familiars.module';
import { EstadoCivilsModule } from './estado_civils/estado_civils.module';
import { HorariosModule } from './horarios/horarios.module';
import { CitasModule } from './citas/citas.module';
import { HorarioFechasModule } from './horario_fechas/horario_fechas.module';

import { HistoriaClinicasModule } from './historia-clinicas/historia-clinicas.module';
import { HistorialMedicosModule } from './historial-medicos/historial-medicos.module';
import { ExamenBucalsModule } from './examen-bucals/examen-bucals.module';
import { EnfermedadsModule } from './enfermedads/enfermedads.module';
import { EmbarazosModule } from './embarazos/embarazos.module';
import { PlanTratamientosModule } from './plan-tratamientos/plan-tratamientos.module';
import { ProcedimientosModule } from './procedimientos/procedimientos.module';
import { OdontogramaModule } from './odontograma/odontograma.module';
import { OdontrogramaVersionModule } from './odontrograma-version/odontrograma-version.module';

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
    UsersModule,
    AuthModule,
    PacientesModule,
    FamiliarsModule,
    EstadoCivilsModule,
    HorariosModule,
    CitasModule,
    HorarioFechasModule,

    HistoriaClinicasModule,
    HistorialMedicosModule,
    ExamenBucalsModule,
    EnfermedadsModule,
    EmbarazosModule,
    PlanTratamientosModule,
    ProcedimientosModule,
    OdontogramaModule,
    OdontrogramaVersionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
