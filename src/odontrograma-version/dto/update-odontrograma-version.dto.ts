import { PartialType } from '@nestjs/swagger';
import { CreateOdontrogramaVersionDto } from './create-odontrograma-version.dto';

export class UpdateOdontrogramaVersionDto extends PartialType(CreateOdontrogramaVersionDto) {}
