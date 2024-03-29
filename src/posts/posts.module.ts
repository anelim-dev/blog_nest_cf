import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersModule } from "src/users/users.module";


import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

import { Post, PostSchema } from "./schemas/posts.schema";

@Module({
    imports:[
        UsersModule,
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema}]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule{};