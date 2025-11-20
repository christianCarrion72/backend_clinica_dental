import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import { Procedimiento } from 'src/procedimientos/entities/procedimiento.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planTratamiento')
export class PlanTratamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  diagnosticoTratamiento: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  pieza: string;

  @Column({ nullable: true })
  precio: number;

  @ManyToOne(
    () => HistoriaClinica,
    (historiaClinica) => historiaClinica.planTratamientos,
    { nullable: false },
  )
  @JoinColumn({ name: 'historiaClinicaId' })
  historiaClinica: HistoriaClinica;

  @OneToMany(
    () => Procedimiento,
    (procedimiento) => procedimiento.planTratamiento,
  )
  procedimientos: Procedimiento[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
