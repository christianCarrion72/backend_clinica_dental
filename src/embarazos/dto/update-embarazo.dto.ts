import { PartialType } from '@nestjs/swagger';
import { CreateEmbarazoDto } from './create-embarazo.dto';

export class UpdateEmbarazoDto extends PartialType(CreateEmbarazoDto) {}
