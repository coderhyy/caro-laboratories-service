import { Injectable } from '@nestjs/common';
import { CreateDgSunriseDto } from './dto/create-dg-sunrise.dto';
import { UpdateDgSunriseDto } from './dto/update-dg-sunrise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DgSunrise } from './entities/dg-sunrise.entity';

@Injectable()
export class DgSunriseService {
  constructor(
    @InjectRepository(DgSunrise)
    private repository: Repository<DgSunrise>,
  ) {}

  create(createDgSunriseDto: CreateDgSunriseDto) {
    return this.repository.save(createDgSunriseDto);
  }

  findAll() {
    return `This action returns all dgSunrise`;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateDgSunriseDto: UpdateDgSunriseDto) {
    return this.repository.update(id, updateDgSunriseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} dgSunrise`;
  }
}
