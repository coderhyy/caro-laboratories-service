import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { FileModule } from './modules/file/file.module';
import { GoodsModule } from './modules/goods/goods.module';

import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', 'root'),
        charset: 'utf8mb4',
        database: configService.get('DB_DATABASE', 'caro_laboratories'),
        synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    FileModule,
    GoodsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
