import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module'; 
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    UsersModule, 
    PostsModule
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService ]
})
export class AdminModule {}
