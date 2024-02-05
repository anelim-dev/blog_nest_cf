import { Model, Types } from "mongoose";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Post } from "./schemas/posts.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

import { UsersService } from "src/users/users.service";
import { ObjectId } from "mongodb";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private readonly userService: UsersService,
    ) {}

    async findAllPosts(): Promise<Post[]> {
        return this.postModel.find().lean();
    }

    async searchPost(searchPostDto): Promise<Post[]> {
        const { title, content, limit = 10, skip = 0 }  = searchPostDto;
        if (!title && !content) {
            throw new BadRequestException('At least one criteria for searching must be provided');
        }
        let filter: any = {
            ...(title && { title: new RegExp( title, 'i') }),
            ...(content && { content: new RegExp( content, 'i') }),
        }
        try {
            return this.postModel.find(filter)
            .limit(limit)
            .skip(skip)
            .lean();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error searching posts');            
        }
    }

    async filterPosts(filterPostDto): Promise<Post[]> {
        const { authorId, categories, limit = 10, skip = 0}  = filterPostDto;        

        if (!authorId && !categories) {
            throw new BadRequestException('At least one criteria for filtering must be provided');
        }
        const categoriesFilter = categories ? categories.split(',') : [];

        let filter: any = {
            ...(authorId && { authorId: new Types.ObjectId(authorId) }),
            ...(categoriesFilter.length > 0 && { categories: { $all : categoriesFilter } }),
        };
        try {
            return this.postModel.find(filter)
             .limit(limit)
             .skip(skip)
             .lean();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error filtering posts');            
        }
    }

    async findPostById(id: string): Promise<Post> {
        return this.postModel.findById(id).lean();
    }
  
    async findAllPostsByUserId(id: string): Promise<Post[]> {
        const userExists = await this.userService.userExistsById(id);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }
        try {
            const posts = await this.postModel.find({authorId: id}).lean();
            return posts;
        } catch (error) {
            console.error(error);
            throw new NotFoundException('Error finding posts for user with id: ' + id);            
        }
    }

    async createPost(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async updatePost(
        id: string,
        updatePostDto: UpdatePostDto,
    ):Promise<Post>{
        return this.postModel.updateOne({_id: id}, updatePostDto).lean();
    }

    async removePost(id: string): Promise<Post> {
        return this.postModel.deleteOne({_id:id}).lean();
    }
}