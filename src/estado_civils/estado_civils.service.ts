import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { EstadoCivil } from './entities/estado_civil.entity';
import { UpdateEstadoCivilDto } from './dto/update-estado_civil.dto';

@Injectable()
export class EstadoCivilsService {
  constructor(
    @InjectRepository(EstadoCivil)
    private readonly estadoCivilRepository: Repository<EstadoCivil>,
  ) {}

  async create(
    createEstadoCivilDto: CreateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    const estadoCivil = this.estadoCivilRepository.create(createEstadoCivilDto);
    return await this.estadoCivilRepository.save(estadoCivil);
  }

  async findAll(): Promise<EstadoCivil[]> {
    return await this.estadoCivilRepository.find();
  }

  async findOne(id: number): Promise<EstadoCivil> {
    const estadoCivil = await this.estadoCivilRepository.findOne({
      where: { id },
      relations: ['pacientes'],
    });

    if (!estadoCivil) {
      throw new NotFoundException(`Estado civil con ID ${id} no encontrado`);
    }

    return estadoCivil;
  }

  async update(
    id: number,
    updateEstadoCivilDto: UpdateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    const estadoCivil = await this.findOne(id);
    this.estadoCivilRepository.merge(estadoCivil, updateEstadoCivilDto);
    return await this.estadoCivilRepository.save(estadoCivil);
  }

  async remove(id: number): Promise<void> {
    const estadoCivil = await this.findOne(id);
    await this.estadoCivilRepository.softRemove(estadoCivil);
  }
}
