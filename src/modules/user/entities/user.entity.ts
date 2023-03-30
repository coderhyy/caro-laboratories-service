import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

import { hashSync } from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, default: '' })
  nickname: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Timestamp;

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }
}
