import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './rol.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Role, (role) => role.usuarios)
  rol: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
