import { PlanTratamiento } from 'src/plan-tratamientos/entities/plan-tratamiento.entity';
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

@Entity('procedimiento')
export class Procedimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'date' })
  fecha: Date;

  @Column({ nullable: true, type: 'date' })
  proximaCita: Date;

  @Column({ nullable: true })
  trabajoRealizado: string;

  @ManyToOne(
    () => PlanTratamiento,
    (planTratamiento) => planTratamiento.procedimientos,
  )
  @JoinColumn({ name: 'planTratamientoId' })
  planTratamiento: PlanTratamiento;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
