import { HistorialMedico } from 'src/historial-medicos/entities/historial-medico.entity';
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

@Entity('embarazo')
export class Embarazo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  anticonceptivo: boolean;

  @Column({ nullable: false })
  estaEmbarazada: boolean;

  @OneToOne(
    () => HistorialMedico,
    (historialMedico) => historialMedico.embarazo,
  )
  @JoinColumn({ name: 'historialMedicoId' })
  historialMedico: HistorialMedico;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
