import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planTratamiento')
export class PlanTratamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  diagnosticoTratamiento: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  pieza: string;

  @Column({ nullable: true })
  precio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
