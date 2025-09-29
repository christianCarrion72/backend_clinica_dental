import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../users/entities/rol.entity';
import { User } from '../../users/entities/user.entity';
import { Roles } from '../../auth/enums/roles.enum';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class InitialSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run() {
    await this.createRoles();
    await this.createAdminUser();
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
}