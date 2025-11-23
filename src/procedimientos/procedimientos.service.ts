import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcedimientoDto } from './dto/create-procedimiento.dto';
import { UpdateProcedimientoDto } from './dto/update-procedimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedimiento } from './entities/procedimiento.entity';
import { Repository } from 'typeorm';
import { PlanTratamiento } from 'src/plan-tratamientos/entities/plan-tratamiento.entity';

@Injectable()
export class ProcedimientosService {
  constructor(
    @InjectRepository(Procedimiento)
    private readonly procedimientoRepository: Repository<Procedimiento>,
    @InjectRepository(PlanTratamiento)
    private readonly planTratamientoRepository: Repository<PlanTratamiento>,
  ) {}

  async create(
    createProcedimientoDto: CreateProcedimientoDto,
  ): Promise<Procedimiento> {
    const procedimientoData: Partial<Procedimiento> = {
      fecha: createProcedimientoDto.fecha,
      proximaCita: createProcedimientoDto.proximaCita,
      trabajoRealizado: createProcedimientoDto.trabajoRealizado,
    };
    const planTratamiento = await this.planTratamientoRepository.findOne({
      where: {
        id: createProcedimientoDto.planTratamientoId,
      },
    });
    if (!planTratamiento)
      throw new BadRequestException('Plan de Tratamiento no encontrado');
    procedimientoData.planTratamiento = planTratamiento;
    return await this.procedimientoRepository.save(procedimientoData);
  }

  async findAll(): Promise<Procedimiento[]> {
    return await this.procedimientoRepository.find({
      relations: ['planTratamiento'],
    });
  }

  async findOne(id: number): Promise<Procedimiento> {
    const procedimiento = await this.procedimientoRepository.findOne({
      where: { id },
      relations: ['planTratamiento'],
    });
    if (!procedimiento)
      throw new NotFoundException('Procedimiento no encontrado');
    return procedimiento;
  }

  async findByPlanTratamientoId(
    planTratamientoId: number,
  ): Promise<Procedimiento[]> {
    const procedimientos = await this.procedimientoRepository.find({
      where: { planTratamiento: { id: planTratamientoId } },
      relations: ['planTratamiento'],
    });

    return procedimientos;
  }

  async update(
    id: number,
    updateProcedimientoDto: UpdateProcedimientoDto,
  ): Promise<Procedimiento> {
    const procedimiento = await this.procedimientoRepository.findOne({
      where: { id },
      relations: ['planTratamiento'],
    });
    if (!procedimiento)
      throw new NotFoundException('Procedimiento no encontrado');
    if (updateProcedimientoDto.planTratamientoId) {
      const planTratamiento = await this.planTratamientoRepository.findOne({
        where: { id: updateProcedimientoDto.planTratamientoId },
      });
      if (!planTratamiento)
        throw new BadRequestException('Plan de tratamiento no encontrado');
      procedimiento.planTratamiento = planTratamiento;
    }
    if (updateProcedimientoDto.fecha)
      procedimiento.fecha = updateProcedimientoDto.fecha;
    if (updateProcedimientoDto.proximaCita)
      procedimiento.proximaCita = updateProcedimientoDto.proximaCita;
    if (updateProcedimientoDto.trabajoRealizado)
      procedimiento.trabajoRealizado = updateProcedimientoDto.trabajoRealizado;
    return await this.procedimientoRepository.save(procedimiento);
  }

  async remove(id: number): Promise<void> {
    const procedimiento = await this.findOne(id);
    await this.procedimientoRepository.softDelete(procedimiento);
  }
}
