import { Injectable } from '@nestjs/common';
import { CreateChipDto } from './dto/create-chip.dto';
import { UpdateChipDto } from './dto/update-chip.dto';
import { Chip } from './entities/chip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChipService {
  constructor(
    @InjectRepository(Chip)
    private repository: Repository<Chip>,
  ) {}

  create(createChipDto: CreateChipDto) {
    return this.repository.save(createChipDto);
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
    return `This action returns a #${id} chip`;
  }

  update(id: number, updateChipDto: UpdateChipDto) {
    return this.repository.update(id, updateChipDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
