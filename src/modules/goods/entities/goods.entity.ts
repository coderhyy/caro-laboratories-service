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
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  url: string;

  @Column({ type: 'decimal', scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'simple-json' })
  locale: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Timestamp;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;
}
