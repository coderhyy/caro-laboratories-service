import { Module } from '@nestjs/common';
import { SearchlightService } from './searchlight.service';
import { SearchlightController } from './searchlight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chip } from './entities/chip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chip])],
  controllers: [SearchlightController],
  providers: [SearchlightService],
})
export class SearchlightModule {}
