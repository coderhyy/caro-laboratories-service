import { Module } from '@nestjs/common';
import { ChipService } from './chip.service';
import { ChipController } from './chip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chip } from './entities/chip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chip])],
  controllers: [ChipController],
  providers: [ChipService],
})
export class ChipModule {}
