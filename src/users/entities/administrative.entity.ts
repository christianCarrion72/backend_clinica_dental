import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('administrativos')
export class Administrative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  area: string;

  @Column({ length: 100 })
  cargo: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
