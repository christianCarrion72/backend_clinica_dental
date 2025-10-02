import { Module } from '@nestjs/common';
import { FamiliarsService } from './familiars.service';
import { FamiliarsController } from './familiars.controller';
import { Familiar } from './entities/familiar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Familiar, Paciente]),
    AuthModule
  ],
  controllers: [FamiliarsController],
  providers: [FamiliarsService],
})
export class FamiliarsModule {}
