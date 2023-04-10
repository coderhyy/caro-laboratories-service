import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  @IsOptional()
  nickname: string;

  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  roleId: number;
}
