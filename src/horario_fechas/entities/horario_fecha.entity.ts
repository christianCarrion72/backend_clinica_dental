import { Cita } from 'src/citas/entities/cita.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Dentist } from 'src/users/entities/dentist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HorarioFecha {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ default: true })
  disponible: boolean;

  @ManyToOne(() => Horario, (horario) => horario.horariosFecha, {
    nullable: false,
    eager: true,
  })
  horario: Horario;

  @ManyToOne(() => Dentist, (dentista) => dentista.horariosFecha, {
    nullable: false,
    eager: true,
  })
  dentista: Dentist;

  @OneToMany(() => Cita, (cita) => cita.horarioFecha)
  citas: Cita[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
