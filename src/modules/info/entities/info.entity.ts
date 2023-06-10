import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json' })
  zh: Record<string, any>;

  @Column({ type: 'simple-json' })
  en: Record<string, any>;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;
}
