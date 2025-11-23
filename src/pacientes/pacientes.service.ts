import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { EstadoCivil } from 'src/estado_civils/entities/estado_civil.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(EstadoCivil)
    private readonly estadoCivilRepository: Repository<EstadoCivil>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const pacienteData: Partial<Paciente> = {
      nombre: createPacienteDto.nombre,
      fecha_nacimiento: createPacienteDto.fecha_nacimiento,
      edad: createPacienteDto.edad,
      ocupacion: createPacienteDto.ocupacion,
      telefono: createPacienteDto.telefono,
      celular: createPacienteDto.celular,
    };
    const existeCorreo = await this.pacienteRepository.findOne({
      where: { email: createPacienteDto.email },
    });
    if (existeCorreo)
      throw new BadRequestException('El correo ya esta registrado');
    pacienteData.email = createPacienteDto.email;
    const estadoCivil = await this.estadoCivilRepository.findOneBy({
      id: createPacienteDto.estado_civil_id,
    });
    if (!estadoCivil)
      throw new BadRequestException('estado civil no encontrado');
    pacienteData.estadoCivil = estadoCivil;

    return await this.pacienteRepository.save(pacienteData);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find({
      relations: ['estadoCivil', 'familiares'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },
      relations: ['estadoCivil', 'familiares'],
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }

    return paciente;
  }

  async update(
    id: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ id });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');
    if (updatePacienteDto.nombre) paciente.nombre = updatePacienteDto.nombre;
    if (updatePacienteDto.fecha_nacimiento)
      paciente.fecha_nacimiento = updatePacienteDto.fecha_nacimiento;
    if (updatePacienteDto.edad) paciente.edad = updatePacienteDto.edad;
    if (updatePacienteDto.ocupacion)
      paciente.ocupacion = updatePacienteDto.ocupacion;
    if (updatePacienteDto.telefono)
      paciente.telefono = updatePacienteDto.telefono;
    if (updatePacienteDto.email) {
      const existeCorreo = await this.pacienteRepository.findOne({
        where: { email: updatePacienteDto.email },
      });
      if (existeCorreo && existeCorreo.id !== id)
        throw new BadRequestException('El correo ya esta registrado');
      paciente.email = updatePacienteDto.email;
    }
    if (updatePacienteDto.celular) paciente.celular = updatePacienteDto.celular;
    if (updatePacienteDto.estado_civil_id) {
      const estadoCivil = await this.estadoCivilRepository.findOneBy({
        id: updatePacienteDto.estado_civil_id,
      });
      if (!estadoCivil)
        throw new BadRequestException('estado civil no encontrado');
      paciente.estadoCivil = estadoCivil;
    }
    return await this.pacienteRepository.save(paciente);
  }

  async remove(id: number): Promise<void> {
    const paciente = await this.findOne(id);
    await this.pacienteRepository.softRemove(paciente);
  }

  async search(query: string): Promise<Paciente[]> {
    if (/^\d+$/.test(query)) {
      const pacientePorId = await this.pacienteRepository.findOne({
        where: { id: parseInt(query) },
        relations: ['estadoCivil', 'familiares'],
      });
      return pacientePorId ? [pacientePorId] : [];
    }

    const pacientes = await this.pacienteRepository.find({
      where: {
        nombre: ILike(`%${query}%`),
      },
      relations: ['estadoCivil', 'familiares'],
    });

    return pacientes;
  }
}
