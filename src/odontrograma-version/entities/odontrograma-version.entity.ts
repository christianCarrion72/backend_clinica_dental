import { Odontograma } from 'src/odontograma/entities/odontograma.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('odontrograma_version')
export class OdontrogramaVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreVersion: string;

  @Column({ type: 'jsonb' })
  json: Record<string, any>;

  @ManyToOne(
    () => Odontograma,
    (odontograma) => odontograma.odontrograma_versions,
  )
  @JoinColumn({ name: 'odontograma_id' })
  odontograma: Odontograma;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
