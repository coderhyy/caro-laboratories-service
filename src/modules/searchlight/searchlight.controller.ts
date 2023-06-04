import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SearchlightService } from './searchlight.service';
import { CreateSearchlightDto } from './dto/create-searchlight.dto';
import { UpdateSearchlightDto } from './dto/update-searchlight.dto';

@Controller('searchlight')
export class SearchlightController {
  constructor(private readonly searchlightService: SearchlightService) {}

  @Post()
  create(@Body() createSearchlightDto: CreateSearchlightDto) {
    return this.searchlightService.create(createSearchlightDto);
  }

  @Get()
  findAll() {
    return this.searchlightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchlightService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSearchlightDto: UpdateSearchlightDto,
  ) {
    return this.searchlightService.update(+id, updateSearchlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchlightService.remove(+id);
  }
}
