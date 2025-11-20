import { Module } from '@nestjs/common';
import { ExamenBucalsService } from './examen-bucals.service';
import { ExamenBucalsController } from './examen-bucals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenBucal } from './entities/examen-bucal.entity';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamenBucal, HistoriaClinica]),
    AuthModule,
  ],
  controllers: [ExamenBucalsController],
  providers: [ExamenBucalsService],
  exports: [TypeOrmModule],
})
export class ExamenBucalsModule {}
