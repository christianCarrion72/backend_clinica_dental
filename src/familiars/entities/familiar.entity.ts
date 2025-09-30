import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('familiares')
export class Familiar {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Paciente, (paciente) => paciente.familiares)
    paciente: Paciente;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 50 })
    parentesco: string;

    @Column({ length: 20 })
    celular: string;
}