import { Module } from '@nestjs/common';
import { SearchlightService } from './searchlight.service';
import { SearchlightController } from './searchlight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Searchlight } from './entities/searchlight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Searchlight])],
  controllers: [SearchlightController],
  providers: [SearchlightService],
})
export class SearchlightModule {}
