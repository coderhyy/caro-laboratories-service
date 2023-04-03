import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from '../role/role.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post('register')
  create(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  getUserInfo(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('menu')
  async getUserMenuList(@Req() req) {
    const role = await this.roleService.findById(req.user.role?.id);
    return role.menus;
  }

  @Get('list')
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
