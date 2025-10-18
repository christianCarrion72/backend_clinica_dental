import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioFechaDto } from './dto/create-horario_fecha.dto';
import { UpdateHorarioFechaDto } from './dto/update-horario_fecha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioFecha } from './entities/horario_fecha.entity';
import { Repository } from 'typeorm';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Dentist } from 'src/users/entities/dentist.entity';

@Injectable()
export class HorarioFechasService {

  constructor(
    @InjectRepository(HorarioFecha)
    private readonly horarioFechasRepository: Repository<HorarioFecha>,

    @InjectRepository(Horario) 
    private readonly horariosRepository: Repository<Horario>,

    @InjectRepository(Dentist)
    private readonly dentistasRepository: Repository<Dentist>
  ){}

  async create(createHorarioFechaDto: CreateHorarioFechaDto) {
    const horarioFechaData: Partial<HorarioFecha> = {
      fecha: createHorarioFechaDto.fecha,
      disponible: createHorarioFechaDto.disponible
    };

    const horario = await this.horariosRepository.findOneBy({id: createHorarioFechaDto.horarioId});
    if (!horario) throw new BadRequestException('Horario no encontrado');

    const dentista = await this.dentistasRepository.findOneBy({id: createHorarioFechaDto.dentistaId});
    if (!dentista) throw new BadRequestException('Dentista no encontrado');

    horarioFechaData.horario = horario;
    horarioFechaData.dentista = dentista; 

    return await this.horarioFechasRepository.save(horarioFechaData);
  }

  async findAll() {
    return await this.horarioFechasRepository.find({
      relations: ['horario', 'dentista'],
    });
  }

  async findOne(id: number) {
    const horarioFecha =  await this.horarioFechasRepository.findOneBy({id});
    if (!horarioFecha) {
      throw new NotFoundException('HorarioFecha no encontrado');
    }

    return horarioFecha;
  }

  async update(id: number, updateHorarioFechaDto: UpdateHorarioFechaDto) {
    const horarioFecha = await this.horarioFechasRepository.findOneBy({id});
    if (!horarioFecha) throw new NotFoundException('HorarioFecha no encontrado');

    if (updateHorarioFechaDto.horarioId) {
      const horario = await this.horariosRepository.findOneBy({id: updateHorarioFechaDto.horarioId});
      if (!horario) throw new BadRequestException('Horario no encontrado');
      horarioFecha.horario = horario;
    }

    if (updateHorarioFechaDto.dentistaId) {
      const dentista = await this.dentistasRepository.findOneBy({id: updateHorarioFechaDto.dentistaId});
      if (!dentista) throw new BadRequestException('Dentista no encontrado');
      horarioFecha.dentista = dentista;
    }

    if (updateHorarioFechaDto.fecha) horarioFecha.fecha = updateHorarioFechaDto.fecha;
    if (updateHorarioFechaDto.disponible != undefined) horarioFecha.disponible = updateHorarioFechaDto.disponible;
    
    return await this.horarioFechasRepository.save(horarioFecha);
  }

  async remove(id: number) {
    return await this.horarioFechasRepository.softDelete(id);
  }
}
