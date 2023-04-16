import { Exclude } from 'class-transformer';
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
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @Column({ type: 'boolean', default: false })
  state: boolean;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateDate: Timestamp;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;
}
