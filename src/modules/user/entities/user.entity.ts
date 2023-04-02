import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, default: '' })
  nickname: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Timestamp;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
