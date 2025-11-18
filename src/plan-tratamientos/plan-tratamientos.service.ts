import { Injectable } from '@nestjs/common';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';

@Injectable()
export class PlanTratamientosService {
  create(createPlanTratamientoDto: CreatePlanTratamientoDto) {
    return 'This action adds a new planTratamiento';
  }

  findAll() {
    return `This action returns all planTratamientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planTratamiento`;
  }

  update(id: number, updatePlanTratamientoDto: UpdatePlanTratamientoDto) {
    return `This action updates a #${id} planTratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} planTratamiento`;
  }
}
