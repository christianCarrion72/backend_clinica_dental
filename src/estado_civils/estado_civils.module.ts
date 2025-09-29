import { Module } from '@nestjs/common';
import { EstadoCivilsService } from './estado_civils.service';
import { EstadoCivilsController } from './estado_civils.controller';

@Module({
  controllers: [EstadoCivilsController],
  providers: [EstadoCivilsService],
})
export class EstadoCivilsModule {}
