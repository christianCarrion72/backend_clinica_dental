import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';

@Entity('dentistas')
export class Dentist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  especialidad: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @OneToMany(() => HorarioFecha, (horarioFecha) => horarioFecha.dentista)
  horariosFecha: HorarioFecha[];
}
