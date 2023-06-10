import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('create')
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @Get('list')
  findAll() {
    return this.infoService.findAll();
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.infoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
