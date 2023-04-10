import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Like, Repository } from 'typeorm';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private menuService: MenuService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { menuIds = [] } = createRoleDto;

    const menus = await this.menuService.findByIds(menuIds);

    const newRole = this.roleRepository.create({ ...createRoleDto, menus });

    return await this.roleRepository.save(newRole);
  }

  async findAll(query) {
    const { keyWords = '', page = 1, pageSize = 10 } = query;

    const [list, total] = await this.roleRepository.findAndCount({
      where: {
        name: Like(`%${keyWords}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  async findById(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
    });
  }

  async findRoleMenuList(id: number) {
    const role = await this.roleRepository.findOne({
      relations: ['menus'],
      where: { id },
    });

    // console.log(role);

    const menuTree = [];
    const menuMap = new Map();
    for (const menu of role.menus) {
      menuMap.set(menu.id, menu);

      if (!menu.parentId) {
        menuTree.push(menu);
      } else {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children = parent.children ?? [];
          parent.children.push(menu);
        }
      }
    }

    return menuTree;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findById(id);

    if (!role) {
      throw new HttpException(`id为${id}的角色不存在`, HttpStatus.BAD_REQUEST);
    }

    const { menuIds = [] } = updateRoleDto;
    const menus = await this.menuService.findByIds(menuIds);
    role.menus = menus;

    const updateRole = this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(updateRole);
  }

  async remove(id: number) {
    return await this.roleRepository.softDelete(id);
  }
}
