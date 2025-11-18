import { Injectable } from '@nestjs/common';
import { CreateEnfermedadDto } from './dto/create-enfermedad.dto';
import { UpdateEnfermedadDto } from './dto/update-enfermedad.dto';

@Injectable()
export class EnfermedadsService {
  create(createEnfermedadDto: CreateEnfermedadDto) {
    return 'This action adds a new enfermedad';
  }

  findAll() {
    return `This action returns all enfermedads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enfermedad`;
  }

  update(id: number, updateEnfermedadDto: UpdateEnfermedadDto) {
    return `This action updates a #${id} enfermedad`;
  }

  remove(id: number) {
    return `This action removes a #${id} enfermedad`;
  }
}
