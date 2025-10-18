import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';

@Injectable()
export class CitasService {

  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,

    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,

    @InjectRepository(HorarioFecha)
    private readonly horarioFechasRepository: Repository<HorarioFecha>
  ) {}

  async create(createCitaDto: CreateCitaDto) {
    const citaData: Partial<Cita> = {
      estado: createCitaDto.estado,
      consultorio: createCitaDto.consultorio
    };

    const paciente = await this.pacientesRepository.findOneBy({ id: createCitaDto.pacienteId});
    if (!paciente) throw new BadRequestException('Paciente no encontrado');
    citaData.paciente = paciente;

    const horarioFecha = await this.horarioFechasRepository.findOneBy({ id: createCitaDto.horarioFechaId});
    if (!horarioFecha) throw new BadRequestException('HorarioFecha no encontrado');
    citaData.horarioFecha = horarioFecha;

    if (!createCitaDto.observaciones) {
      citaData.observaciones = 'Sin observaciones';
    }else{
      citaData.observaciones = createCitaDto.observaciones;
    }
    return await this.citasRepository.save(citaData);
  }

  async findAll() {
    return await this.citasRepository.find();
  }

  async findOne(id: number) {
    return await this.citasRepository.findOneBy({id});
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citasRepository.findOneBy({id});
    if (!cita) throw new NotFoundException('Cita no encontrada');

    if (updateCitaDto.consultorio) cita.consultorio = updateCitaDto.consultorio;
    if (updateCitaDto.estado) cita.estado = updateCitaDto.estado;
    if (updateCitaDto.observaciones) cita.observaciones = updateCitaDto.observaciones;
    if (updateCitaDto.horarioFechaId) {
      const horarioFecha = await this.horarioFechasRepository.findOneBy({ id: updateCitaDto.horarioFechaId});
      if (!horarioFecha) throw new BadRequestException('HorarioFecha no encontrado');
      cita.horarioFecha = horarioFecha;
    }
    if (updateCitaDto.pacienteId) {
      const paciente = await this.pacientesRepository.findOneBy({ id: updateCitaDto.pacienteId});
      if (!paciente) throw new BadRequestException('Paciente no encontrado');
      cita.paciente = paciente;
    }

    return await this.citasRepository.save(cita);
  }

  async remove(id: number) {
    const cita = await this.citasRepository.findOneBy({id});

    if (!cita) throw new NotFoundException('Cita no encontrada');

    await this.citasRepository.softDelete(id);

    if (cita.horarioFecha) {
      cita.horarioFecha.disponible = true;
      await this.horarioFechasRepository.save(cita.horarioFecha);
    }
    
    return { message: `Cita con id ${id} eliminada correctamente` };
  }
}
