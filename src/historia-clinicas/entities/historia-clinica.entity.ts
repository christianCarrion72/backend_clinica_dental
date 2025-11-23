import { HistorialMedico } from 'src/historial-medicos/entities/historial-medico.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { PlanTratamiento } from 'src/plan-tratamientos/entities/plan-tratamiento.entity';
import { Dentist } from 'src/users/entities/dentist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('historiaClinica')
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  fechaIngreso: Date;

  @Column({ nullable: false })
  motivoConsulta: string;

  @OneToOne(
    () => HistorialMedico,
    (historialMedico) => historialMedico.historiaClinica,
  )
  historialMedico: HistorialMedico;

  @OneToOne(() => Paciente, (paciente) => paciente.historiaClinica, {
    nullable: false,
  })
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @OneToMany(
    () => PlanTratamiento,
    (planTratamiento) => planTratamiento.historiaClinica,
  )
  planTratamientos: PlanTratamiento[];

  @ManyToMany(() => Dentist, (dentist) => dentist.historiasClinicas)
  @JoinTable({
    name: 'historiaClinicaDentista',
    joinColumn: { name: 'historiaClinicaId' },
    inverseJoinColumn: { name: 'dentistaId' },
  })
  dentistas: Dentist[];

  @Column('simple-array', { nullable: true })
  examenBucal: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
