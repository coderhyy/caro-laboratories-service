import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CoverService } from './cover.service';
import { CreateCoverDto } from './dto/create-cover.dto';
import { UpdateCoverDto } from './dto/update-cover.dto';

@Controller('cover')
export class CoverController {
  constructor(private readonly coverService: CoverService) {}

  @Post('create')
  create(@Body() createCoverDto: CreateCoverDto) {
    return this.coverService.create(createCoverDto);
  }

  @Get('list')
  findAll(@Query() query) {
    return this.coverService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coverService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCoverDto: UpdateCoverDto) {
    return this.coverService.update(+id, updateCoverDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.coverService.remove(+id);
  }
}
