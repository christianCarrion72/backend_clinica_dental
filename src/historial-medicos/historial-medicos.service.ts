import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialMedicoDto } from './dto/create-historial-medico.dto';
import { UpdateHistorialMedicoDto } from './dto/update-historial-medico.dto';
import { HistorialMedico } from './entities/historial-medico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Injectable()
export class HistorialMedicosService {
  constructor(
    @InjectRepository(HistorialMedico)
    private readonly historialMedicoRepositoty: Repository<HistorialMedico>,
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
  ) {}
  async create(createHistorialMedicoDto: CreateHistorialMedicoDto) {
    const historiaClinica = await this.historiaClinicaRepository.findOne({
      where: { id: createHistorialMedicoDto.historiaClinicaId },
    });
    if (!historiaClinica) {
      throw new NotFoundException('Historia clínica no encontrada');
    }
    const historial = this.historialMedicoRepositoty.create({
      alergia: createHistorialMedicoDto.alergia,
      fuma: createHistorialMedicoDto.fuma,
      nombreAlergias: createHistorialMedicoDto.nombreAlergias,
      nombreTratamiento: createHistorialMedicoDto.nombreTratamiento,
      otrasEnfermedades: createHistorialMedicoDto.otrasEnfermedades,
      tratamientoActivo: createHistorialMedicoDto.tratamientoActivo,
      ultimaConsulta: createHistorialMedicoDto.ultimaConsulta,
      historiaClinica,
      enfermedades: createHistorialMedicoDto.enfermedades || [],
    });
    return await this.historialMedicoRepositoty.save(historial);
  }

  async findAll() {
    return await this.historialMedicoRepositoty.find({
      relations: ['historiaClinica'],
    });
  }

  async findOne(id: number) {
    return await this.historialMedicoRepositoty.findOne({
      where: { id },
      relations: ['historiaClinica'],
    });
  }

  async findByHistoriaClinicaId(historiaClinicaId: number) {
    const historialMedico = await this.historialMedicoRepositoty.findOne({
      where: { historiaClinica: { id: historiaClinicaId } },
      relations: ['historiaClinica'],
    });

    if (!historialMedico) {
      throw new NotFoundException(
        'False',
      );
    }

    return historialMedico;
  }

  async update(id: number, updateHistorialMedicoDto: UpdateHistorialMedicoDto) {
    const historial = await this.historialMedicoRepositoty.findOne({
      where: { id },
      relations: ['historiaClinica'],
    });
    if (!historial) {
      throw new NotFoundException('Historial médico no encontrado');
    }
    if (updateHistorialMedicoDto.alergia !== undefined)
      historial.alergia = updateHistorialMedicoDto.alergia;
    if (updateHistorialMedicoDto.fuma !== undefined)
      historial.fuma = updateHistorialMedicoDto.fuma;
    if (updateHistorialMedicoDto.nombreAlergias !== undefined)
      historial.nombreAlergias = updateHistorialMedicoDto.nombreAlergias;
    if (updateHistorialMedicoDto.nombreTratamiento !== undefined)
      historial.nombreTratamiento = updateHistorialMedicoDto.nombreTratamiento;
    if (updateHistorialMedicoDto.otrasEnfermedades !== undefined)
      historial.otrasEnfermedades = updateHistorialMedicoDto.otrasEnfermedades;
    if (updateHistorialMedicoDto.tratamientoActivo !== undefined)
      historial.tratamientoActivo = updateHistorialMedicoDto.tratamientoActivo;
    if (updateHistorialMedicoDto.ultimaConsulta !== undefined)
      historial.ultimaConsulta = updateHistorialMedicoDto.ultimaConsulta;
    if (updateHistorialMedicoDto.enfermedades !== undefined)
      historial.enfermedades = updateHistorialMedicoDto.enfermedades;

    if (updateHistorialMedicoDto.historiaClinicaId !== undefined) {
      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: { id: updateHistorialMedicoDto.historiaClinicaId },
      });
      if (!historiaClinica) {
        throw new NotFoundException('Historia clínica no encontrada');
      }
      historial.historiaClinica = historiaClinica;
    }

    return await this.historialMedicoRepositoty.save(historial);
  }

  async remove(id: number) {
    const historial = await this.findOne(id);
    if (!historial) {
      throw new NotFoundException('Historial médico no encontrado');
    }
    return await this.historialMedicoRepositoty.softDelete(id);
  }
}
