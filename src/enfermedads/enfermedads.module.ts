import { Module } from '@nestjs/common';
import { EnfermedadsService } from './enfermedads.service';
import { EnfermedadsController } from './enfermedads.controller';

@Module({
  controllers: [EnfermedadsController],
  providers: [EnfermedadsService],
})
export class EnfermedadsModule {}
