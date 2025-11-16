import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoCivil } from '../../estado_civils/entities/estado_civil.entity';
import { Familiar } from '../../familiars/entities/familiar.entity';
import { Cita } from 'src/citas/entities/cita.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ nullable: true })
  edad: number;

  @Column({ length: 100, nullable: true, unique: true })
  email: string;

  @ManyToOne(() => EstadoCivil, (estadoCivil) => estadoCivil.pacientes, {
    nullable: true,
    eager: true,
  })
  estadoCivil: EstadoCivil;

  @Column({ length: 100, nullable: true })
  ocupacion: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 20 })
  celular: string;

  @OneToMany(() => Familiar, (familiar) => familiar.paciente)
  familiares: Familiar[];

  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
