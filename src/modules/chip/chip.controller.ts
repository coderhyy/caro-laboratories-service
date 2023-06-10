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
import { ChipService } from './chip.service';
import { CreateChipDto } from './dto/create-chip.dto';
import { UpdateChipDto } from './dto/update-chip.dto';

@Controller('chip')
export class ChipController {
  constructor(private readonly chipService: ChipService) {}

  @Post('create')
  create(@Body() createChipDto: CreateChipDto) {
    return this.chipService.create(createChipDto);
  }

  @Get('list')
  findAll(@Query() query) {
    return this.chipService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chipService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateChipDto: UpdateChipDto) {
    return this.chipService.update(+id, updateChipDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.chipService.remove(+id);
  }
}
