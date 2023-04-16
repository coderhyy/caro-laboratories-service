import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Like, Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoRepository.save(createVideoDto);
  }

  async findAll(query: Record<string, any>) {
    const { keyWords = '', page = 1, pageSize = 10 } = query;
    const [list, total] = await this.videoRepository.findAndCount({
      where: { name: Like(`%${keyWords}%`) },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { list, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  remove(id: number) {
    return this.videoRepository.softDelete(id);
  }
}
