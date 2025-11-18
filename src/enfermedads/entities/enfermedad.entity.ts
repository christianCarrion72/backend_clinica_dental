import { HistorialMedico } from 'src/historial-medicos/entities/historial-medico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('enfermedad')
export class Enfermedad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @ManyToMany(
    () => HistorialMedico,
    (historialMedico) => historialMedico.enfermedades,
    { cascade: ['insert', 'update'] },
  )
  @JoinTable({
    name: 'historialEnfermedades',
    joinColumn: { name: 'enfermedadId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'historialMedicoId',
      referencedColumnName: 'id',
    },
  })
  historialesMedicos: HistorialMedico[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
