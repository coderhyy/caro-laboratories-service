import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateGoodsDto {
  @IsNotEmpty({ message: '商品标题必填' })
  title: string;

  @IsOptional()
  @MaxLength(256)
  remarks: string;
}
