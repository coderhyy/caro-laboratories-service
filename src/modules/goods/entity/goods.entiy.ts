import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export enum GoodsStatus {
  NORMAL = 1,
  HOT = 2,
  OFFSHELF = 3,
}

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({ default: '' })
  subtitle: string;

  @Column({
    length: 256,
    default: '暂无',
  })
  remarks: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: GoodsStatus,
    default: GoodsStatus.NORMAL,
  })
  status: GoodsStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  putDate: Timestamp;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateDate: Timestamp;
}
