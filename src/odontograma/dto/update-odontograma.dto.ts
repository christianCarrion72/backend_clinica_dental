import { PartialType } from '@nestjs/swagger';
import { CreateOdontogramaDto } from './create-odontograma.dto';

export class UpdateOdontogramaDto extends PartialType(CreateOdontogramaDto) {}
