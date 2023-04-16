import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsBoolean()
  @IsOptional()
  state: boolean;
}
