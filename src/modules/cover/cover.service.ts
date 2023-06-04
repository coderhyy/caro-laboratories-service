import { Injectable } from '@nestjs/common';
import { CreateCoverDto } from './dto/create-cover.dto';
import { UpdateCoverDto } from './dto/update-cover.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Cover } from './entities/cover.entity';

@Injectable()
export class CoverService {
  constructor(
    @InjectRepository(Cover)
    private coverRepository: Repository<Cover>,
  ) {}

  create(createCoverDto: CreateCoverDto) {
    return this.coverRepository.save(createCoverDto);
  }

  async findAll(query) {
    const { page = 1, pageSize = 10 } = query;

    const [list, total] = await this.coverRepository.findAndCount({
      order: { sort: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} cover`;
  }

  update(id: number, updateGoodDto: UpdateCoverDto) {
    return this.coverRepository.update(id, updateGoodDto);
  }

  remove(id: number) {
    return this.coverRepository.softDelete(id);
  }
}
