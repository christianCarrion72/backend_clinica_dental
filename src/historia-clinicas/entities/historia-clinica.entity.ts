import { HistorialMedico } from 'src/historial-medicos/entities/historial-medico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
