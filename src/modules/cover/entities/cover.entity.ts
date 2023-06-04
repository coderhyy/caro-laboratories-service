import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  foregroundImage: string;

  @Column({ default: '' })
  backgroundImage: string;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Timestamp;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;
}
