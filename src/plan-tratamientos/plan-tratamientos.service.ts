import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';
import { PlanTratamiento } from './entities/plan-tratamiento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Injectable()
export class PlanTratamientosService {
  constructor(
    @InjectRepository(PlanTratamiento)
    private readonly planTratamientoRepository: Repository<PlanTratamiento>,
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
  ) {}

  async create(createPlanTratamientoDto: CreatePlanTratamientoDto) {
    const planData: Partial<PlanTratamiento> = {
      diagnosticoTratamiento: createPlanTratamientoDto.diagnosticoTratamiento,
      estado: createPlanTratamientoDto.estado,
      fecha: createPlanTratamientoDto.fecha,
      pieza: createPlanTratamientoDto.pieza,
      precio: createPlanTratamientoDto.precio,
    };
    const historiaClinica = await this.historiaClinicaRepository.findOne({
      where: { id: createPlanTratamientoDto.historiaClinicaId },
    });
    if (!historiaClinica)
      throw new NotFoundException('No se encontro la historia clinica');
    planData.historiaClinica = historiaClinica;
    return await this.planTratamientoRepository.save(planData);
  }

  async findAll(): Promise<PlanTratamiento[]> {
    return await this.planTratamientoRepository.find({
      relations: ['historiaClinica', 'procedimientos'],
    });
  }

  async findOne(id: number): Promise<PlanTratamiento> {
    const planTratamiento = await this.planTratamientoRepository.findOne({
      where: { id },
      relations: ['historiaClinica', 'procedimientos'],
    });
    if (!planTratamiento)
      throw new NotFoundException('No se encontro el plan de tratamiento');
    return planTratamiento;
  }

  async update(id: number, updatePlanTratamientoDto: UpdatePlanTratamientoDto) {
    const planTratamiento = await this.planTratamientoRepository.findOne({
      where: { id },
    });
    if (!planTratamiento)
      throw new NotFoundException('No se encontro el plan de tratamiento');
    if (updatePlanTratamientoDto.historiaClinicaId) {
      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: { id: updatePlanTratamientoDto.historiaClinicaId },
      });
      if (!historiaClinica)
        throw new NotFoundException('No se encontro la historia clinica');
      planTratamiento.historiaClinica = historiaClinica;
    }
    if (updatePlanTratamientoDto.diagnosticoTratamiento) {
      planTratamiento.diagnosticoTratamiento =
        updatePlanTratamientoDto.diagnosticoTratamiento;
    }
    if (updatePlanTratamientoDto.estado) {
      planTratamiento.estado = updatePlanTratamientoDto.estado;
    }
    if (updatePlanTratamientoDto.fecha) {
      planTratamiento.fecha = updatePlanTratamientoDto.fecha;
    }
    if (updatePlanTratamientoDto.pieza) {
      planTratamiento.pieza = updatePlanTratamientoDto.pieza;
    }
    if (updatePlanTratamientoDto.precio) {
      planTratamiento.precio = updatePlanTratamientoDto.precio;
    }
    return await this.planTratamientoRepository.save(planTratamiento);
  }

  async remove(id: number): Promise<void> {
    const planTratamiento = await this.findOne(id);
    await this.planTratamientoRepository.softDelete(planTratamiento);
  }
}
