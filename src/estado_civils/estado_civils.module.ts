import { Module } from '@nestjs/common';
import { EstadoCivilsService } from './estado_civils.service';
import { EstadoCivilsController } from './estado_civils.controller';
import { EstadoCivil } from './entities/estado_civil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstadoCivil]),
    AuthModule
  ],
  controllers: [EstadoCivilsController],
  providers: [EstadoCivilsService],
})
export class EstadoCivilsModule {}
