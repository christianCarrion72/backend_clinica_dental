import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoCivil } from '../../estado_civils/entities/estado_civil.entity';
import { Familiar } from '../../familiars/entities/familiar.entity';

@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column({ nullable: true })
    edad: number;

    @ManyToOne(() => EstadoCivil, (estadoCivil) => estadoCivil.pacientes)
    estadoCivil: EstadoCivil;

    @Column({ length: 100, nullable: true })
    ocupacion: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    @Column({ length: 20 })
    celular: string;

    @OneToMany(() => Familiar, (familiar) => familiar.paciente)
    familiares: Familiar[];
}