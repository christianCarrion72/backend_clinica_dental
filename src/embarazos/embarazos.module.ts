import { Module } from '@nestjs/common';
import { EmbarazosService } from './embarazos.service';
import { EmbarazosController } from './embarazos.controller';

@Module({
  controllers: [EmbarazosController],
  providers: [EmbarazosService],
})
export class EmbarazosModule {}
