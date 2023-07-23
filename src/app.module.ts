import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from './users/users.module';
import { config } from './configs/orm.config';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'local',
    }),
    AuthModule,
    TodoModule,
   
  ],

  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
    LocalStrategy,
    JwtStrategy,],
})
export class AppModule {}
