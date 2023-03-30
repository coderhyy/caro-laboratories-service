import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from './entity/goods.entiy';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
