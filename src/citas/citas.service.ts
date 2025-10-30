import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { CalendarService } from './services/calendar.service';
import { Dentist } from 'src/users/entities/dentist.entity';

@Injectable()
export class CitasService {

  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
    @InjectRepository(HorarioFecha)
    private readonly horarioFechasRepository: Repository<HorarioFecha>,
    @InjectRepository(Dentist)
    private readonly dentistRepository: Repository<Dentist>,
    private readonly calendarService: CalendarService,
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
    
    if (!horarioFecha.disponible) {
      throw new BadRequestException('El horario seleccionado ya se encuentra reservado');
    }
    
    citaData.horarioFecha = horarioFecha;
    citaData.observaciones = createCitaDto.observaciones || 'Sin observaciones';
    const nuevaCita = await this.citasRepository.save(citaData);

    horarioFecha.disponible = false;
    await this.horarioFechasRepository.save(horarioFecha);

    await this.calendarService.agregarAlCalendario(nuevaCita);
    
    const citaActualizada = await this.citasRepository.save(nuevaCita);
    return citaActualizada;
  }

  async findAll() {
    return await this.citasRepository.find();
  }

  async findForDentist(id_dentist: number){
    const dentista = await this.dentistRepository.findOne({
      where: { id: id_dentist},
      relations:['usuario']
    });
    if (!dentista) throw new BadRequestException('El dentista no existe');
    
    const dentistaHorario = await this.horarioFechasRepository.find({
      where: {dentista: dentista, disponible: false }
    });
    if(!dentistaHorario) throw new NotFoundException('El dentista no tiene citas programdas');
    
    const citasPorDentista = await this.citasRepository.find({ 
      where: {horarioFecha: dentistaHorario, estado: 'confirmada'},
      order: {id: 'ASC'} 
    });
    if(!citasPorDentista) throw new NotFoundException('No tiene ninguna cita agendada en este momento');
    
    return citasPorDentista;
  }

  async findOne(id: number) {
    return await this.citasRepository.findOneBy({id});
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citasRepository.findOneBy({id});
    if (!cita) throw new NotFoundException('Cita no encontrada');

    const horarioFechaAnterior = cita.horarioFecha;

    if (updateCitaDto.consultorio) cita.consultorio = updateCitaDto.consultorio;
    if (updateCitaDto.estado) cita.estado = updateCitaDto.estado;
    if (updateCitaDto.observaciones) cita.observaciones = updateCitaDto.observaciones;
    
    if (updateCitaDto.horarioFechaId) {
      const nuevoHorarioFecha = await this.horarioFechasRepository.findOneBy({ 
        id: updateCitaDto.horarioFechaId
      });
      if (!nuevoHorarioFecha) throw new BadRequestException('HorarioFecha no encontrado');
      
      if (!nuevoHorarioFecha.disponible) throw new BadRequestException('El horario seleccionado ya se encuentra reservado');

      cita.horarioFecha = nuevoHorarioFecha;

      nuevoHorarioFecha.disponible = false;
      await this.horarioFechasRepository.save(nuevoHorarioFecha);

      if (horarioFechaAnterior) {
        const ahora = new Date();
        const fechaHoraAnterior = this.combinarFechaYHora(
          horarioFechaAnterior.fecha,
          horarioFechaAnterior.horario.horaFin
        );

        if (fechaHoraAnterior > ahora) {
          horarioFechaAnterior.disponible = true;
          await this.horarioFechasRepository.save(horarioFechaAnterior);
        }
      }
    }
    
    if (updateCitaDto.pacienteId) {
      const paciente = await this.pacientesRepository.findOneBy({ id: updateCitaDto.pacienteId});
      if (!paciente) throw new BadRequestException('Paciente no encontrado');
      cita.paciente = paciente;
    }
    
    const citaActualizada = await this.citasRepository.save(cita);
    await this.calendarService.actualizarCalendario(citaActualizada);
    return citaActualizada;
  }

  async remove(id: number) {
    const cita = await this.citasRepository.findOneBy({id});

    if (!cita) throw new NotFoundException('Cita no encontrada');

    await this.citasRepository.softDelete(id);

    if (cita.horarioFecha) {
      const ahora = new Date();
      const fechaHoraFin = this.combinarFechaYHora(
        cita.horarioFecha.fecha,
        cita.horarioFecha.horario.horaFin
      );

      if (fechaHoraFin > ahora) {
        cita.horarioFecha.disponible = true;
        await this.horarioFechasRepository.save(cita.horarioFecha);
      }
    }

    await this.calendarService.eliminarDeCalendario(cita);
    return { message: `Cita con id ${id} eliminada correctamente` };
  }

  /**
   * Combina una fecha con una hora para crear un Date completo
   * @param fecha Fecha en formato Date
   * @param hora Hora en formato HH:mm:ss (string)
   * @returns Date combinado
   */
  private combinarFechaYHora(fecha: Date, hora: string): Date {
    const [horas, minutos, segundos] = hora.split(':').map(Number);
    
    const fechaLocal = new Date(fecha);
    fechaLocal.setHours(horas, minutos, segundos, 0);
    
    return fechaLocal;
  }
}