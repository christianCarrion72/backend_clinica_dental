import { Injectable } from '@nestjs/common';
import { CreateExamenBucalDto } from './dto/create-examen-bucal.dto';
import { UpdateExamenBucalDto } from './dto/update-examen-bucal.dto';

@Injectable()
export class ExamenBucalsService {
  create(createExamenBucalDto: CreateExamenBucalDto) {
    return 'This action adds a new examenBucal';
  }

  findAll() {
    return `This action returns all examenBucals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examenBucal`;
  }

  update(id: number, updateExamenBucalDto: UpdateExamenBucalDto) {
    return `This action updates a #${id} examenBucal`;
  }

  remove(id: number) {
    return `This action removes a #${id} examenBucal`;
  }
}
