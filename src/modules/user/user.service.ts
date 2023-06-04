import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async register(user: CreateUserDto) {
    const { username, roleId } = user;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const role = roleId ? await this.roleService.findById(roleId) : null;

    const newUser = await this.userRepository.create({
      ...user,
      role,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll(query) {
    const { keyWords = '', page = 1, pageSize = 10 } = query;

    const [list, total] = await this.userRepository.findAndCount({
      relations: ['role'],
      where: {
        username: Like(`%${keyWords}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      relations: ['role'],
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException(`id为${id}的用户不存在`, HttpStatus.BAD_REQUEST);
    }

    const { roleId } = updateUserDto;
    const role = roleId ? await this.roleService.findById(roleId) : user.role;

    const updateUser = this.userRepository.merge(user, updateUserDto, { role });

    return await this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    const existUser = await this.findOne(id);

    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.softRemove(existUser);
  }
}
