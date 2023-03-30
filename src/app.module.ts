import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from './guard/token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from './modules/goods/goods.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      type: 'mysql',
      username: 'root',
      host: 'localhost',
      charset: 'utf8mb4',
      password: 'root',
      database: 'caro_laboratories',
      synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
      autoLoadEntities: true,
    }),
    AuthModule,
    GoodsModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: TokenGuard,
    // },
  ],
})
export class AppModule {}
