import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() body: CreateGoodsDto) {
    return this.goodsService.create(body);
  }

  @Get()
  getList(@Query() query) {
    return this.goodsService.getList(query);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, join(process.cwd(), 'public'));
        },
        filename(req, file, cb) {
          const unique = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const imgPath = `${unique}.${file.mimetype.split('/')[1]}`;
          cb(null, imgPath);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },
      fileFilter(req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          cb(new HttpException(`只支持jpg, png格式`, 401), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file?: Express.Multer.File) {
    console.log(file);

    return file;
  }
}
