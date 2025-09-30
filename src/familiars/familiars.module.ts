import { Module } from '@nestjs/common';
import { FamiliarsService } from './familiars.service';
import { FamiliarsController } from './familiars.controller';
import { Familiar } from './entities/familiar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Familiar]),
    AuthModule
  ],
  controllers: [FamiliarsController],
  providers: [FamiliarsService],
})
export class FamiliarsModule {}
