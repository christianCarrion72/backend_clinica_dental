import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamenBucalDto } from './dto/create-examen-bucal.dto';
import { UpdateExamenBucalDto } from './dto/update-examen-bucal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenBucal } from './entities/examen-bucal.entity';
import { Repository } from 'typeorm';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Injectable()
export class ExamenBucalsService {
  constructor(
    @InjectRepository(ExamenBucal)
    private readonly examenBucalRepository: Repository<ExamenBucal>,

    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
  ) {}

  async create(createExamenBucalDto: CreateExamenBucalDto) {
    const examenBucalData: Partial<ExamenBucal> = {
      dientes: createExamenBucalDto.dientes,
      encia: createExamenBucalDto.encia,
      higieneBucal: createExamenBucalDto.higieneBucal,
      labios: createExamenBucalDto.labios,
      lengua: createExamenBucalDto.lengua,
      mucosaBucal: createExamenBucalDto.mucosaBucal,
      oclusion: createExamenBucalDto.oclusion,
      otrosDatos: createExamenBucalDto.otrosDatos,
    };

    const historiaClinica = await this.historiaClinicaRepository.findOne({
      where: {
        id: createExamenBucalDto.historiaClinicaId,
      },
    });

    if (!historiaClinica)
      throw new NotFoundException('Historia clínica no encontrada');

    examenBucalData.historiaClinica = historiaClinica;
    return await this.examenBucalRepository.save(examenBucalData);
  }

  async findAll(): Promise<ExamenBucal[]> {
    return await this.examenBucalRepository.find({
      relations: ['historiaClinica'],
    });
  }

  async findOne(id: number): Promise<ExamenBucal> {
    const examenBucal = await this.examenBucalRepository.findOne({
      where: { id },
      relations: ['historiaClinica'],
    });
    if (!examenBucal) throw new NotFoundException('Examen bucal no encontrado');
    return examenBucal;
  }

  async update(
    id: number,
    updateExamenBucalDto: UpdateExamenBucalDto,
  ): Promise<ExamenBucal> {
    const examenBucal = await this.findOne(id);
    if (updateExamenBucalDto.historiaClinicaId) {
      const historiaClinica = await this.historiaClinicaRepository.findOne({
        where: {
          id: updateExamenBucalDto.historiaClinicaId,
        },
      });
      if (!historiaClinica)
        throw new NotFoundException('Historia clínica no encontrada');
      examenBucal.historiaClinica = historiaClinica;
    }
    if (updateExamenBucalDto.dientes)
      examenBucal.dientes = updateExamenBucalDto.dientes;
    if (updateExamenBucalDto.encia)
      examenBucal.encia = updateExamenBucalDto.encia;
    if (updateExamenBucalDto.higieneBucal)
      examenBucal.higieneBucal = updateExamenBucalDto.higieneBucal;
    if (updateExamenBucalDto.labios)
      examenBucal.labios = updateExamenBucalDto.labios;
    if (updateExamenBucalDto.lengua)
      examenBucal.lengua = updateExamenBucalDto.lengua;
    if (updateExamenBucalDto.mucosaBucal)
      examenBucal.mucosaBucal = updateExamenBucalDto.mucosaBucal;
    if (updateExamenBucalDto.oclusion)
      examenBucal.oclusion = updateExamenBucalDto.oclusion;
    if (updateExamenBucalDto.otrosDatos)
      examenBucal.otrosDatos = updateExamenBucalDto.otrosDatos;
    if (updateExamenBucalDto.paladar)
      examenBucal.paladar = updateExamenBucalDto.paladar;
    if (updateExamenBucalDto.pisoBoca)
      examenBucal.pisoBoca = updateExamenBucalDto.pisoBoca;
    return await this.examenBucalRepository.save(examenBucal);
  }

  async remove(id: number): Promise<void> {
    const examenBucal = await this.findOne(id);
    await this.examenBucalRepository.softDelete(examenBucal);
  }
}
