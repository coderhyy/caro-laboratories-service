import { Menu } from 'src/modules/menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Timestamp;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Timestamp;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  menus: Menu[];
}
