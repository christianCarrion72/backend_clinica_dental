import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('dentistas')
export class Dentist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  especialidad: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}