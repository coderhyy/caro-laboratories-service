import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchlightDto } from './create-searchlight.dto';

export class UpdateSearchlightDto extends PartialType(CreateSearchlightDto) {}
