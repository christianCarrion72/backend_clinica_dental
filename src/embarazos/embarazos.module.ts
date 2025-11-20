import { Module } from '@nestjs/common';
import { EmbarazosService } from './embarazos.service';
import { EmbarazosController } from './embarazos.controller';
import { Embarazo } from './entities/embarazo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Embarazo])],
  controllers: [EmbarazosController],
  providers: [EmbarazosService],
  exports: [TypeOrmModule],
})
export class EmbarazosModule {}
