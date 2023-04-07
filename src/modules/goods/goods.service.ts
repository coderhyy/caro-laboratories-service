import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './entities/goods.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
  ) {}

  create(createGoodDto: CreateGoodDto) {
    return this.goodsRepository.save(createGoodDto);
  }

  async findAll(query) {
    const { page = 1, pageSize = 10, keyWords, isHomePageDisplay } = query;

    const whereOpt = {};
    keyWords && Object.assign(whereOpt, { name: Like(`%${keyWords}%`) });
    isHomePageDisplay &&
      Object.assign(whereOpt, {
        isHomePageDisplay: JSON.parse(isHomePageDisplay),
      });

    const [list, total] = await this.goodsRepository.findAndCount({
      where: whereOpt,
      order: { sort: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return this.goodsRepository.update(id, updateGoodDto);
  }

  remove(id: number) {
    return this.goodsRepository.softDelete(id);
  }
}
