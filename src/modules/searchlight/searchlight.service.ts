import { Injectable } from '@nestjs/common';
import { CreateSearchlightDto } from './dto/create-searchlight.dto';
import { UpdateSearchlightDto } from './dto/update-searchlight.dto';

@Injectable()
export class SearchlightService {
  create(createSearchlightDto: CreateSearchlightDto) {
    return 'This action adds a new searchlight';
  }

  findAll() {
    return `This action returns all searchlight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} searchlight`;
  }

  update(id: number, updateSearchlightDto: UpdateSearchlightDto) {
    return `This action updates a #${id} searchlight`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchlight`;
  }
}
