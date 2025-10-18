import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../users/entities/rol.entity';
import { User } from '../../users/entities/user.entity';
import { Roles } from '../../auth/enums/roles.enum';
import * as bcryptjs from 'bcryptjs';
import { Dentist } from 'src/users/entities/dentist.entity';
import { Administrative } from 'src/users/entities/administrative.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Cita } from 'src/citas/entities/cita.entity';
import { EstadoCivil } from 'src/estado_civils/entities/estado_civil.entity';
import { Familiar } from 'src/familiars/entities/familiar.entity';

@Injectable()
export class InitialSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Dentist)
    private readonly dentistRepository: Repository<Dentist>,
    @InjectRepository(Administrative)
    private readonly administrativeRepository: Repository<Administrative>,
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
    @InjectRepository(HorarioFecha)
    private readonly horarioFechaRepository: Repository<HorarioFecha>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    @InjectRepository(EstadoCivil)
    private readonly estadoCivilRepository: Repository<EstadoCivil>,
    @InjectRepository(Familiar)
    private readonly familiarRepository: Repository<Familiar>,
  ) {}

  async run() {
    await this.createRoles();
    await this.createAdminUser();
    await this.createDentistUser();
    await this.createAdministrativeUser();
    await this.createHorarios();
    await this.createHorariosFecha();
    await this.createCitas();
    await this.createEstadoCivil();
    await this.createPacientes();
    await this.createFamiliares();
    //await this.createCitas();
  }

  private async createRoles() {
    const roles = [
      { nombre: Roles.ADMIN, descripcion: 'Administrador del sistema' },
      { nombre: Roles.DENTIST, descripcion: 'Dentista de la clínica' },
      { nombre: Roles.ADMINISTRATIVE, descripcion: 'Personal administrativo' },
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { nombre: role.nombre },
      });

      if (!existingRole) {
        await this.roleRepository.save(role);
      }
    }
  }

  private async createAdminUser() {
    const adminRole = await this.roleRepository.findOne({
      where: { nombre: Roles.ADMIN },
    });

    if (!adminRole) {
      throw new Error('Rol de administrador no encontrado');
    }

    const existingAdmin = await this.userRepository.findOne({
      where: { correo: 'admin@clinica.com' },
    });

    if (!existingAdmin) {
      const adminUser = this.userRepository.create({
        nombre: 'Administrador',
        correo: 'admin@clinica.com',
        contraseña: await bcryptjs.hash('123456789', 10),
        telefono: '12345678',
        direccion: 'Dirección de la clínica',
        estado: true,
        rol: adminRole,
      });

      await this.userRepository.save(adminUser);
    }
  }

  private async createDentistUser() {
    const dentistRole = await this.roleRepository.findOneBy({nombre: Roles.DENTIST});
    if (!dentistRole) throw new NotFoundException('Rol de Dentista no encontrado');
    const usuarios = [ 
      { 
        nombre: 'Dr Juan Perez', 
        correo:'dentista1@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del dentista 1', 
        estado: true, 
        rol: dentistRole 
      },
      {
        nombre: 'Dr Jorge Mendez', 
        correo:'dentista2@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del dentista 2', 
        estado: true, 
        rol: dentistRole
      },
      {
        nombre: 'Dra Luz Villarroel', 
        correo:'dentista3@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del dentista 2', 
        estado: true, 
        rol: dentistRole
      },
    ];    
    let indice = 0;
    const especialidades = ['Odontologia General','Ortodoncia','Endodoncia']
    for(const usuario of usuarios){
      const existeCorreo = await this.userRepository.findOneBy({correo: usuario.correo});
      if(!existeCorreo) {
        const userSaved = await this.userRepository.save(usuario);
        await this.dentistRepository.save({
          especialidad: especialidades[indice],
          usuario: userSaved
        })
      }
      indice = (indice + 1) % especialidades.length;
    }
  }

  private async createAdministrativeUser() {
    const administrativeRole = await this.roleRepository.findOneBy({nombre: Roles.ADMINISTRATIVE});
    if (!administrativeRole) throw new NotFoundException('No se encontro el rol Administrativo');

    const usuarios = [ 
      { 
        nombre: 'Martha Lopez', 
        correo:'administrativo1@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del administrativo 1', 
        estado: true, 
        rol: administrativeRole 
      },
      {
        nombre: 'Mario Ballejos', 
        correo:'administrativo2@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del administrativo 2', 
        estado: true, 
        rol: administrativeRole
      },
      {
        nombre: 'Laura Callejas', 
        correo:'administrativo3@clinica.com', 
        contraseña: await bcryptjs.hash('123456789', 10), 
        telefono: '12345678', 
        direccion: 'Direccion del administrativo 2', 
        estado: true, 
        rol: administrativeRole
      },
    ];
    
    let indiceCargos = 0;
    let indiceAreas = 0;
    const cargos = ['Secretaria', 'Recepcionista'];
    const areas = ['Sala de Espera', 'Consultorios'];
    for( const usuario of usuarios){
      const existeCorreo = await this.userRepository.findOneBy({correo: usuario.correo});
      if (!existeCorreo) {
        const userSaved = await this.userRepository.save(usuario);
        await this.administrativeRepository.save({
          cargo: cargos[indiceCargos],
          area: areas[indiceAreas],
          usuario: userSaved
        });
      }
      indiceCargos = (indiceCargos + 1) % cargos.length;
      indiceAreas = (indiceAreas + 1) % areas.length; 
    }
  }

  private async createHorarios() {
    const horariosData = [
      { horaInicio: '08:00:00', horaFin: '08:30:00' },
      { horaInicio: '08:30:00', horaFin: '09:00:00' },
      { horaInicio: '09:00:00', horaFin: '09:30:00' },
      { horaInicio: '09:30:00', horaFin: '10:00:00' },
      { horaInicio: '10:00:00', horaFin: '10:30:00' },
      { horaInicio: '10:30:00', horaFin: '11:00:00' },
      { horaInicio: '11:00:00', horaFin: '11:30:00' },
      { horaInicio: '11:30:00', horaFin: '12:00:00' },
      { horaInicio: '14:00:00', horaFin: '14:30:00' },
      { horaInicio: '14:30:00', horaFin: '15:00:00' },
      { horaInicio: '15:00:00', horaFin: '15:30:00' },
      { horaInicio: '15:30:00', horaFin: '16:00:00' },
      { horaInicio: '16:00:00', horaFin: '16:30:00' },
      { horaInicio: '16:30:00', horaFin: '17:00:00' },
    ];

    for (const horario of horariosData) {
      const existe = await this.horarioRepository.findOneBy({
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      });

      if (!existe) {
        await this.horarioRepository.save(horario);
        console.log(`Horario ${horario.horaInicio} - ${horario.horaFin} creado`);
      }
    }
  }

  private async createHorariosFecha() {
    const horarios = await this.horarioRepository.find();
    const dentistas = await this.dentistRepository.find({ relations: ['usuario'] });

    if (horarios.length === 0 || dentistas.length === 0) {
      console.log('No hay horarios o dentistas para generar HorariosFecha.');
      return;
    }

    const diasGenerar = 7;
    const hoy = new Date();

    for (let i = 0; i < diasGenerar; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);

      for (const dentista of dentistas) {
        for (const horario of horarios) {
          const existe = await this.horarioFechaRepository.findOne({
            where: { fecha, dentista: { id: dentista.id }, horario: { id: horario.id } },
          });

          if (!existe) {
            await this.horarioFechaRepository.save({
              fecha,
              disponible: true,
              dentista,
              horario,
            });
            console.log(`HorarioFecha creado: ${fecha.toISOString().split('T')[0]} - ${horario.horaInicio}-${horario.horaFin} con ${dentista.usuario.nombre}`);
          }
        }
      }
    }
  }

  private async createEstadoCivil() {
    const estados = [
      { descripcion: 'Soltero/a' },
      { descripcion: 'Casado/a' },
      { descripcion: 'Divorciado/a' },
      { descripcion: 'Viudo/a' },
      { descripcion: 'Unión libre' },
    ];

    for (const estado of estados) {
      const existe = await this.estadoCivilRepository.findOne({
        where: { descripcion: estado.descripcion },
      });

      if (!existe) {
        await this.estadoCivilRepository.save(estado);
        console.log(`Estado civil creado: ${estado.descripcion}`);
      }
    }

    console.log('Seeder de estados civiles completado.');
  }

  private async createPacientes() {
    const estadosCiviles = await this.estadoCivilRepository.find();

    if (estadosCiviles.length === 0) {
      console.log('No hay estados civiles. Primero ejecuta el seeder de EstadoCivil.');
      return;
    }

    const pacientes = [
      {
        nombre: 'Juan Pérez',
        fecha_nacimiento: new Date('1990-05-12'),
        ocupacion: 'Ingeniero',
        email: 'paciente1@gmail.com',
        telefono: '33445566',
        celular: '78945612',
      },
      {
        nombre: 'María Gómez',
        fecha_nacimiento: new Date('1985-10-03'),
        ocupacion: 'Doctora',
        email: 'paciente2@gmail.com',
        telefono: '22223333',
        celular: '76451238',
      },
      {
        nombre: 'Carlos López',
        fecha_nacimiento: new Date('2000-03-22'),
        ocupacion: 'Estudiante',
        email: 'paciente3@gmail.com',
        telefono: '44445555',
        celular: '78456321',
      },
      {
        nombre: 'Ana Fernández',
        fecha_nacimiento: new Date('1995-07-18'),
        ocupacion: 'Abogada',
        email: 'paciente4@gmail.com',
        telefono: '33336666',
        celular: '70125478',
      },
    ];

    for (const data of pacientes) {
      const edad = new Date().getFullYear() - data.fecha_nacimiento.getFullYear();

      const estadoCivil = estadosCiviles[Math.floor(Math.random() * estadosCiviles.length)];

      const existe = await this.pacienteRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (!existe) {
        await this.pacienteRepository.save({
          ...data,
          edad,
          estadoCivil,
        });
        console.log(`Paciente creado: ${data.nombre}`);
      }
    }

    console.log('Seeder de pacientes completado.');
  }

  private async createFamiliares() {
    const pacientes = await this.pacienteRepository.find();

    if (pacientes.length === 0) {
      console.log('No hay pacientes. Primero ejecuta el seeder de Pacientes.');
      return;
    }

    const parentescos = ['Padre', 'Madre', 'Hermano/a', 'Hijo/a', 'Cónyuge', 'Tío/a'];
    const nombresEjemplo = [
      'José Pérez', 'Laura López', 'Andrés Ramírez', 'Claudia Fernández',
      'Luis Gutiérrez', 'Elena Morales', 'Ricardo Suárez', 'Carolina Vargas',
    ];

    for (const paciente of pacientes) {
      const numFamiliares = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numFamiliares; i++) {
        const nombre = nombresEjemplo[Math.floor(Math.random() * nombresEjemplo.length)];
        const parentesco = parentescos[Math.floor(Math.random() * parentescos.length)];
        const celular = `7${Math.floor(1000000 + Math.random() * 8999999)}`; 

        const existe = await this.familiarRepository.findOne({
          where: { nombre, paciente: { id: paciente.id } },
        });

        if (!existe) {
          await this.familiarRepository.save({
            nombre,
            parentesco,
            celular,
            paciente,
          });
          console.log(`Familiar agregado: ${nombre} (${parentesco}) -> Paciente: ${paciente.nombre}`);
        }
      }
    }

    console.log('Seeder de familiares completado.');
  }


  private async createCitas() {
    const pacientes = await this.pacienteRepository.find();
    const horariosFecha = await this.horarioFechaRepository.find({
      where: { disponible: true },
      relations: ['dentista', 'dentista.usuario', 'horario'],
    });

    if (pacientes.length === 0 || horariosFecha.length === 0) {
      console.log('No hay pacientes o horarios disponibles para crear citas.');
      return;
    }

    let pacienteIndex = 0;

    for (const hf of horariosFecha) {
      const paciente = pacientes[pacienteIndex];

      const existe = await this.citaRepository.findOne({
        where: { paciente: { id: paciente.id }, horarioFecha: { id: hf.id } },
      });

      if (!existe) {
        await this.citaRepository.save({
          estado: 'Pendiente',
          consultorio: 'Consultorio 1',
          observaciones: 'Ninguna',
          paciente,
          horarioFecha: hf,
        });
        hf.disponible = false;
        await this.horarioFechaRepository.save(hf);

        console.log(`Cita creada: Paciente ${paciente.nombre} - ${hf.horario.horaInicio}-${hf.horario.horaFin} con ${hf.dentista.usuario.nombre}`);
      }
      pacienteIndex = (pacienteIndex + 1) % pacientes.length;
    }
  }
}