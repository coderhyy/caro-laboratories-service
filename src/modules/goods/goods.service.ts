import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { Goods } from './entity/goods.entiy';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
  ) {}

  // body:Partial<GoodsEntity>
  async create(body: CreateGoodsDto) {
    const { title } = body;

    // if (!title) {
    //   throw new HttpException('缺少商品标题', 401);
    // }

    const goods = await this.goodsRepository.findOne({ where: { title } });

    if (goods) {
      throw new HttpException('商品已存在', 401);
    }

    return await this.goodsRepository.save(body);
  }

  async getList(query) {
    const { keyWords = '', page = 1, pageSize = 10 } = query;

    const [list, total] = await this.goodsRepository.findAndCount({
      where: {
        title: Like(`%${keyWords}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }
}
