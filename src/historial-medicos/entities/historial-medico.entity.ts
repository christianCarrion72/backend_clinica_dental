import { Embarazo } from 'src/embarazos/entities/embarazo.entity';
import { Enfermedad } from 'src/enfermedads/entities/enfermedad.entity';
import { HistoriaClinica } from 'src/historia-clinicas/entities/historia-clinica.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('historialMedico')
export class HistorialMedico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  alergia: boolean;

  @Column({ nullable: false })
  fuma: boolean;

  @Column({ nullable: true })
  nombreAlergias: string;

  @Column({ nullable: true })
  nombreTratamiento: string;

  @Column({ nullable: true })
  otrasEnfermedades: string;

  @Column({ nullable: false })
  tratamientoActivo: boolean;

  @Column({ nullable: true, type: 'date' })
  ultimaConsulta: Date;

  @OneToOne(
    () => HistoriaClinica,
    (historialClinica) => historialClinica.historialMedico,
  )
  @JoinColumn({ name: 'historiaClinicaId' })
  historiaClinica: HistoriaClinica;

  @ManyToMany(() => Enfermedad, (enfermedad) => enfermedad.historialesMedicos)
  enfermedades: Enfermedad[];

  @OneToOne(() => Embarazo, (embarazo) => embarazo.historialMedico)
  embarazo: Embarazo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
