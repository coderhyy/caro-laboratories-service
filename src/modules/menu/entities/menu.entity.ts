import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  path: string;

  @Column({ default: 0 })
  sort: number;

  @Column('simple-json', { nullable: true })
  meta: Record<string, any>;

  @Exclude()
  @Column({ nullable: true })
  parentId: number;

  @DeleteDateColumn()
  deleteDate: Timestamp;

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
