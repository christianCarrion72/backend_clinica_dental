import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from './entities/rol.entity';
import { Dentist } from './entities/dentist.entity';
import { Administrative } from './entities/administrative.entity';
import { AuthModule } from '../auth/auth.module';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Dentist, Administrative, HorarioFecha]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
