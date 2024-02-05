import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AdminModule } from './admin/admin.module';




@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/blog-nest',
    ),
    AuthModule,
    PostsModule,
    UsersModule,
    CommonModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
