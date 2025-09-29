import { Injectable } from '@nestjs/common';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';

@Injectable()
export class FamiliarsService {
  create(createFamiliarDto: CreateFamiliarDto) {
    return 'This action adds a new familiar';
  }

  findAll() {
    return `This action returns all familiars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familiar`;
  }

  update(id: number, updateFamiliarDto: UpdateFamiliarDto) {
    return `This action updates a #${id} familiar`;
  }

  remove(id: number) {
    return `This action removes a #${id} familiar`;
  }
}
