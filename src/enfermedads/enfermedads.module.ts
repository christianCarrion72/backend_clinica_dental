import { Module } from '@nestjs/common';
import { EnfermedadsService } from './enfermedads.service';
import { EnfermedadsController } from './enfermedads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enfermedad } from './entities/enfermedad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enfermedad])],
  controllers: [EnfermedadsController],
  providers: [EnfermedadsService],
  exports: [TypeOrmModule],
})
export class EnfermedadsModule {}
