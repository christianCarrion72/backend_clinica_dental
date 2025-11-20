import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cita {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  estado: string;

  @Column()
  consultorio: string;

  @Column()
  observaciones: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  externalEventId?: string | null;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas, {
    nullable: false,
    eager: true,
  })
  paciente: Paciente;

  @ManyToOne(() => HorarioFecha, (hf) => hf.citas, {
    nullable: false,
    eager: true,
  })
  horarioFecha: HorarioFecha;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
