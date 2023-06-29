import { Module } from '@nestjs/common';
import { DgSunriseService } from './dg-sunrise.service';
import { DgSunriseController } from './dg-sunrise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DgSunrise } from './entities/dg-sunrise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DgSunrise])],
  controllers: [DgSunriseController],
  providers: [DgSunriseService],
})
export class DgSunriseModule {}
