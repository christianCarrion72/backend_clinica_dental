import { Module } from '@nestjs/common';
import { ExamenBucalsService } from './examen-bucals.service';
import { ExamenBucalsController } from './examen-bucals.controller';

@Module({
  controllers: [ExamenBucalsController],
  providers: [ExamenBucalsService],
})
export class ExamenBucalsModule {}
