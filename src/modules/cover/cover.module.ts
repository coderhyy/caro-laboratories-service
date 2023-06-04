import { Module } from '@nestjs/common';
import { CoverService } from './cover.service';
import { CoverController } from './cover.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cover } from './entities/cover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cover])],
  controllers: [CoverController],
  providers: [CoverService],
})
export class CoverModule {}
