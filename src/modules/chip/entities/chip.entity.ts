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
export class Chip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Timestamp;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;
}
