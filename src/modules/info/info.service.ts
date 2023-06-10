import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from './entities/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info)
    private repository: Repository<Info>,
  ) {}

  create(createInfoDto: CreateInfoDto) {
    return this.repository.save(createInfoDto);
  }

  findAll() {
    return `This action returns all info`;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateInfoDto: UpdateInfoDto) {
    return this.repository.update(id, updateInfoDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
