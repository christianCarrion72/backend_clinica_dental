import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('examenBucal')
export class ExamenBucal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  dientes: string;

  @Column({ nullable: true })
  encia: string;

  @Column({ nullable: true })
  higieneBucal: string;

  @Column({ nullable: true })
  labios: string;

  @Column({ nullable: true })
  lengua: string;

  @Column({ nullable: true })
  mucosaBucal: string;

  @Column({ nullable: true })
  oclusion: string;

  @Column({ nullable: true })
  otrosDatos: string;

  @Column({ nullable: true })
  paladar: string;

  @Column({ nullable: true })
  pisoBoca: string;

  @OneToOne(
    () => HistoriaClinica,
    (historiaClinica) => historiaClinica.examenBucal,
  )
  @JoinColumn({ name: 'historiaClinicaId' })
  historiaClinica: HistoriaClinica;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
