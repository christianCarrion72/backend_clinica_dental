import { Module } from '@nestjs/common';
import { FamiliarsService } from './familiars.service';
import { FamiliarsController } from './familiars.controller';

@Module({
  controllers: [FamiliarsController],
  providers: [FamiliarsService],
})
export class FamiliarsModule {}
