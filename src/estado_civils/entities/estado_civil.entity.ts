import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('estado_civil')
export class EstadoCivil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  descripcion: string;

  @OneToMany(() => Paciente, (paciente) => paciente.estadoCivil)
  pacientes: Paciente[];
}
