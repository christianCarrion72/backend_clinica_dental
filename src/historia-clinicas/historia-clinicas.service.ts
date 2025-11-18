import { Injectable } from '@nestjs/common';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Injectable()
export class HistoriaClinicasService {
  create(createHistoriaClinicaDto: CreateHistoriaClinicaDto) {
    return 'This action adds a new historiaClinica';
  }

  findAll() {
    return `This action returns all historiaClinicas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiaClinica`;
  }

  update(id: number, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    return `This action updates a #${id} historiaClinica`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiaClinica`;
  }
}
