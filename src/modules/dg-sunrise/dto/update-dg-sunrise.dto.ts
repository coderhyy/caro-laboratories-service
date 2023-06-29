import { PartialType } from '@nestjs/mapped-types';
import { CreateDgSunriseDto } from './create-dg-sunrise.dto';

export class UpdateDgSunriseDto extends PartialType(CreateDgSunriseDto) {}
