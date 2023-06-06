import { Injectable } from '@nestjs/common';
import { CreateSearchlightDto } from './dto/create-searchlight.dto';
import { UpdateSearchlightDto } from './dto/update-searchlight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chip } from './entities/chip.entity';

@Injectable()
export class SearchlightService {
  constructor(
    @InjectRepository(Chip)
    private repository: Repository<Chip>,
  ) {}

  create(createSearchlightDto: CreateSearchlightDto) {
    return this.repository.save(createSearchlightDto);
  }

  async findAll(query) {
    const { page = 1, pageSize = 10 } = query;

    const [list, total] = await this.repository.findAndCount({
      order: { sort: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} searchlight`;
  }

  update(id: number, updateSearchlightDto: UpdateSearchlightDto) {
    return `This action updates a #${id} searchlight`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchlight`;
  }
}
