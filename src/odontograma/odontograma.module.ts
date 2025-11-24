import { Module } from '@nestjs/common';
import { OdontogramaService } from './odontograma.service';
import { OdontogramaController } from './odontograma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odontograma } from './entities/odontograma.entity';
import { OdontrogramaVersion } from 'src/odontrograma-version/entities/odontrograma-version.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Odontograma, OdontrogramaVersion, Paciente]),
    AuthModule,
  ],
  controllers: [OdontogramaController],
  providers: [OdontogramaService],
  exports: [TypeOrmModule],
})
export class OdontogramaModule {}
