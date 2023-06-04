import { IsEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  nickname: string;

  @IsEmpty({ message: '不允许修改密码' })
  password: string;

  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  roleId: number;
}
