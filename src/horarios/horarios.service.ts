import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario)
    private readonly horariosRepository: Repository<Horario>,
  ) {}
  async create(createHorarioDto: CreateHorarioDto) {
    const horarioData: Partial<Horario> = {
      horaInicio: createHorarioDto.horaInicio,
      horaFin: createHorarioDto.horaFin,
    };
    return await this.horariosRepository.save(horarioData);
  }

  async findAll() {
    return await this.horariosRepository.find();
  }

  async findOne(id: number) {
    return await this.horariosRepository.findOneBy({ id });
  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto) {
    const horario = await this.horariosRepository.findOneBy({ id });
    if (!horario) throw new NotFoundException('Horario no encontrado');
    if (updateHorarioDto.horaInicio)
      horario.horaInicio = updateHorarioDto.horaInicio;
    if (updateHorarioDto.horaFin) horario.horaFin = updateHorarioDto.horaFin;
    return await this.horariosRepository.save(horario);
  }

  async remove(id: number) {
    return await this.horariosRepository.softDelete(id);
  }
}
