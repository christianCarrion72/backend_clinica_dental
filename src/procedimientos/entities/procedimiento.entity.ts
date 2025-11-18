import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
