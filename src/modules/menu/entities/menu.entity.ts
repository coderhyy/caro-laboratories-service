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

export enum NodeType {
  FOLDER = 1,
  PAGE = 2,
  BUTTON = 3,
}

@Entity()
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, default: '', comment: '菜单编码，用于后端权限控制' })
  menuCode: string;

  @Column({
    type: 'enum',
    enum: NodeType,
    default: NodeType.FOLDER,
    comment: '节点类型，可以是文件夹、页面或者按钮类型',
  })
  nodeType: NodeType;

  @Column({ default: '' })
  iconUrl: string;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({
    default: '',
    comment: '页面对应的地址，如果是文件夹或者按钮类型，可以为空',
  })
  linkUrl: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: '菜单树的层次，以便于查询指定层级的菜单',
  })
  level: number;

  @Column({
    nullable: true,
    comment:
      '树id的路径，主要用于存放从根节点到当前树的父节点的路径，逗号分隔，想要找父节点会特别快',
  })
  path: string;

  @DeleteDateColumn()
  deleteDate: Timestamp;

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
