import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称必填' })
  name: string;

  @IsArray()
  @IsOptional()
  menuIds: number[];
}
