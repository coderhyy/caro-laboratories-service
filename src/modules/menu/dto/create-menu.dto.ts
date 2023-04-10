import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @IsInt()
  @IsOptional()
  parentId: number;

  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  path: string;

  @IsInt()
  @IsOptional()
  sort: number;

  @IsOptional()
  meta: Record<string, any>;
}
