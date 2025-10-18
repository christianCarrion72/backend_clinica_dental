import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Horario {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @OneToMany(() => HorarioFecha, (horarioFecha) => horarioFecha.horario)
  horariosFecha: HorarioFecha[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
