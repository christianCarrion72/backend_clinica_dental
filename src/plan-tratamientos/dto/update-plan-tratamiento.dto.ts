import { PartialType } from '@nestjs/swagger';
import { CreatePlanTratamientoDto } from './create-plan-tratamiento.dto';

export class UpdatePlanTratamientoDto extends PartialType(CreatePlanTratamientoDto) {}
