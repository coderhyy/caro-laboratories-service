import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('list')
  findAll(@Query() query) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findById(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
