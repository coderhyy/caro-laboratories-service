import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, TreeRepository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: TreeRepository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const { parentId } = createMenuDto;

    const parentMenu = parentId
      ? await this.menuRepository.findOne({ where: { id: parentId } })
      : null;

    const newMenu = await this.menuRepository.create({
      ...createMenuDto,
      parent: parentMenu,
    });

    await this.menuRepository.save(newMenu);

    return null;
  }

  findAll() {
    return this.menuRepository.findTrees();
  }

  async findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  findByIds(ids: number[]) {
    return this.menuRepository.findBy({ id: In(ids) });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({ where: { id } });

    if (!menu) {
      throw new HttpException(`id为${id}的菜单不存在`, HttpStatus.BAD_REQUEST);
    }

    const { parentId } = updateMenuDto;

    const parentMenu = parentId
      ? await this.menuRepository.findOne({ where: { id: parentId } })
      : null;

    menu.parent = parentMenu;

    await this.menuRepository.merge(menu, updateMenuDto);
    await this.menuRepository.save(menu);
    return null;
  }

  remove(id: number) {
    return this.menuRepository.softDelete(id);
  }
}
