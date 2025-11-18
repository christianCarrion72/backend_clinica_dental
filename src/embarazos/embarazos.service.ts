import { Injectable } from '@nestjs/common';
import { CreateEmbarazoDto } from './dto/create-embarazo.dto';
import { UpdateEmbarazoDto } from './dto/update-embarazo.dto';

@Injectable()
export class EmbarazosService {
  create(createEmbarazoDto: CreateEmbarazoDto) {
    return 'This action adds a new embarazo';
  }

  findAll() {
    return `This action returns all embarazos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} embarazo`;
  }

  update(id: number, updateEmbarazoDto: UpdateEmbarazoDto) {
    return `This action updates a #${id} embarazo`;
  }

  remove(id: number) {
    return `This action removes a #${id} embarazo`;
  }
}
