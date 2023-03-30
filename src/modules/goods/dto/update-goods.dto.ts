import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateGoodsDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @MaxLength(256)
  remarks: string;
}
