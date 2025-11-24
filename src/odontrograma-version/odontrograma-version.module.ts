import { Module } from '@nestjs/common';
import { OdontrogramaVersionService } from './odontrograma-version.service';
import { OdontrogramaVersionController } from './odontrograma-version.controller';
import { OdontrogramaVersion } from './entities/odontrograma-version.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Odontograma } from 'src/odontograma/entities/odontograma.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OdontrogramaVersion, Odontograma]),
    AuthModule,
  ],
  controllers: [OdontrogramaVersionController],
  providers: [OdontrogramaVersionService],
  exports: [TypeOrmModule],
})
export class OdontrogramaVersionModule {}
