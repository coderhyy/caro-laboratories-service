import { IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  nickname: string;

  @IsOptional()
  password: string;

  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  roleId: number;
}
