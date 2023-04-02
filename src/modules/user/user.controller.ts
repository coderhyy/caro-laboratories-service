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
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  getUserInfo(@Req() req) {
    return req.user;
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
