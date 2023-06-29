import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DgSunriseService } from './dg-sunrise.service';
import { CreateDgSunriseDto } from './dto/create-dg-sunrise.dto';
import { UpdateDgSunriseDto } from './dto/update-dg-sunrise.dto';

@Controller('dg-sunrise')
export class DgSunriseController {
  constructor(private readonly dgSunriseService: DgSunriseService) {}

  @Post()
  create(@Body() createDgSunriseDto: CreateDgSunriseDto) {
    return this.dgSunriseService.create(createDgSunriseDto);
  }

  @Get()
  findAll() {
    return this.dgSunriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dgSunriseService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDgSunriseDto: UpdateDgSunriseDto,
  ) {
    return this.dgSunriseService.update(+id, updateDgSunriseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dgSunriseService.remove(+id);
  }
}
