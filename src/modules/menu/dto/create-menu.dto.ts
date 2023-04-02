import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { NodeType } from '../entities/menu.entity';

export class CreateMenuDto {
  @IsInt()
  @IsOptional()
  parentId: number;

  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  linkUrl: string;

  @IsInt()
  @IsOptional()
  sort: number;

  @IsEnum(NodeType)
  @IsOptional()
  nodeType: NodeType;
}
