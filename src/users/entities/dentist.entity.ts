import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { HorarioFecha } from 'src/horario_fechas/entities/horario_fecha.entity';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';

@Entity('dentistas')
export class Dentist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  especialidad: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToMany(
    () => HistoriaClinica,
    (historiaClinica) => historiaClinica.dentistas,
  )
  historiasClinicas: HistoriaClinica[];

  @OneToMany(() => HorarioFecha, (horarioFecha) => horarioFecha.dentista)
  horariosFecha: HorarioFecha[];
}
