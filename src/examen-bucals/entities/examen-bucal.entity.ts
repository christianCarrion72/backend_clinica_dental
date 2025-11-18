import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
