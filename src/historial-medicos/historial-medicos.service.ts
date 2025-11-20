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
    });
    const saved = await this.historialMedicoRepositoty.save(historial);
    if (
      createHistorialMedicoDto.enfermedades &&
      createHistorialMedicoDto.enfermedades.length
    ) {
      await this.historialMedicoRepositoty
        .createQueryBuilder()
        .relation(HistorialMedico, 'enfermedades')
        .of(saved.id)
        .add(createHistorialMedicoDto.enfermedades);
    }
    return saved;
  }

  async findAll() {
    return await this.historialMedicoRepositoty.find({
      relations: ['enfermedades', 'historiaClinica'],
    });
  }

  async findOne(id: number) {
    return await this.historialMedicoRepositoty.findOne({
      where: { id },
      relations: ['enfermedades', 'historiaClinica'],
    });
  }

  async update(id: number, updateHistorialMedicoDto: UpdateHistorialMedicoDto) {
    const historial = await this.historialMedicoRepositoty.findOne({
      where: { id },
      relations: ['enfermedades', 'historiaClinica'],
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

    if (updateHistorialMedicoDto.historiaClinicaId !== undefined) {
      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: { id: updateHistorialMedicoDto.historiaClinicaId },
      });
      if (!historiaClinica) {
        throw new NotFoundException('Historia clínica no encontrada');
      }
      historial.historiaClinica = historiaClinica;
    }

    const updated = await this.historialMedicoRepositoty.save(historial);

    if (updateHistorialMedicoDto.enfermedades !== undefined) {
      await this.historialMedicoRepositoty
        .createQueryBuilder()
        .relation(HistorialMedico, 'enfermedades')
        .of(updated.id)
        .set(updateHistorialMedicoDto.enfermedades);
    }

    return await this.historialMedicoRepositoty.findOne({
      where: { id: updated.id },
      relations: ['enfermedades', 'historiaClinica'],
    });
  }

  async remove(id: number) {
    const historial = await this.findOne(id);
    if (!historial) {
      throw new NotFoundException('Historial médico no encontrado');
    }
    return await this.historialMedicoRepositoty.softDelete(historial);
  }
}
