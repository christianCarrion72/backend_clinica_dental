import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Dentist } from 'src/users/entities/dentist.entity';

@Injectable()
export class HistoriaClinicasService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Dentist)
    private readonly dentistaRepository: Repository<Dentist>,
  ) {}

  async create(createHistoriaClinicaDto: CreateHistoriaClinicaDto) {
    // Validar que el paciente existe
    const paciente = await this.pacienteRepository.findOne({
      where: { id: createHistoriaClinicaDto.pacienteId },
    });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    // Validar que los dentistas existen
    const dentistas = await this.dentistaRepository.findByIds(
      createHistoriaClinicaDto.dentistas,
    );
    if (dentistas.length !== createHistoriaClinicaDto.dentistas.length) {
      throw new NotFoundException('Uno o más dentistas no fueron encontrados');
    }

    // Crear la historia clínica
    const historiaClinica = this.historiaClinicaRepository.create({
      fechaIngreso: createHistoriaClinicaDto.fechaIngreso,
      motivoConsulta: createHistoriaClinicaDto.motivoConsulta,
      paciente,
      dentistas,
      examenBucal: createHistoriaClinicaDto.examenBucal || [],
    });

    const savedHistoriaClinica =
      await this.historiaClinicaRepository.save(historiaClinica);

    return this.findOne(savedHistoriaClinica.id);
  }

  async findAll() {
    return await this.historiaClinicaRepository.find({
      relations: ['paciente', 'dentistas', 'planTratamientos'],
    });
  }

  async findOne(id: number) {
    const historiaClinica = await this.historiaClinicaRepository.findOne({
      where: { id },
      relations: ['paciente', 'dentistas', 'planTratamientos'],
    });

    if (!historiaClinica) {
      throw new NotFoundException('Historia clínica no encontrada');
    }

    return historiaClinica;
  }

  async findByPacienteId(pacienteId: number) {
    const historiaClinica = await this.historiaClinicaRepository.findOne({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente', 'dentistas', 'planTratamientos'],
    });

    if (!historiaClinica) {
      throw new NotFoundException(
        'False',
      );
    }

    return historiaClinica;
  }

  async update(id: number, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    const historiaClinica = await this.findOne(id);

    if (updateHistoriaClinicaDto.fechaIngreso !== undefined) {
      historiaClinica.fechaIngreso = updateHistoriaClinicaDto.fechaIngreso;
    }
    if (updateHistoriaClinicaDto.motivoConsulta !== undefined) {
      historiaClinica.motivoConsulta = updateHistoriaClinicaDto.motivoConsulta;
    }
    if (updateHistoriaClinicaDto.examenBucal !== undefined) {
      historiaClinica.examenBucal = updateHistoriaClinicaDto.examenBucal;
    }

    // Actualizar paciente si se proporciona
    if (updateHistoriaClinicaDto.pacienteId !== undefined) {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: updateHistoriaClinicaDto.pacienteId },
      });
      if (!paciente) {
        throw new NotFoundException('Paciente no encontrado');
      }
      historiaClinica.paciente = paciente;
    }

    // Actualizar dentistas si se proporcionan
    if (updateHistoriaClinicaDto.dentistas !== undefined) {
      const dentistas = await this.dentistaRepository.findByIds(
        updateHistoriaClinicaDto.dentistas,
      );
      if (dentistas.length !== updateHistoriaClinicaDto.dentistas.length) {
        throw new NotFoundException(
          'Uno o más dentistas no fueron encontrados',
        );
      }
      historiaClinica.dentistas = dentistas;
    }

    await this.historiaClinicaRepository.save(historiaClinica);

    return this.findOne(id);
  }

  async remove(id: number) {
    const historiaClinica = await this.findOne(id);
    return await this.historiaClinicaRepository.softDelete(id);
  }
}
