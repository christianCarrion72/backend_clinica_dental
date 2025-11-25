import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoCivil } from '../../estado_civils/entities/estado_civil.entity';
import { Familiar } from '../../familiars/entities/familiar.entity';
import { Cita } from 'src/citas/entities/cita.entity';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import { Odontograma } from 'src/odontograma/entities/odontograma.entity';

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

  @OneToOne(
    () => HistoriaClinica,
    (historiaClinica) => historiaClinica.paciente,
  )
  historiaClinica: HistoriaClinica;

  @OneToMany(() => Familiar, (familiar) => familiar.paciente)
  familiares: Familiar[];

  @OneToMany(() => Cita, (cita) => cita.paciente)
  citas: Cita[];

  @OneToOne(() => Odontograma, (odontograma) => odontograma.paciente)
  odontograma: Odontograma;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
