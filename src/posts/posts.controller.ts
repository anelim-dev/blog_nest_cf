import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';

import { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAllPosts(): Promise<PostInterface[]> {
    return this.postsService.findAllPosts();
  }

  @Get('/filterPosts')
  filterPosts( @Query() filterPostDto: FilterPostDto): Promise<PostInterface[]> {   
    return this.postsService.filterPosts(filterPostDto);
  }  

  @Get('/searchPosts')
  searchPosts( @Query() searchPostDto: SearchPostDto): Promise<PostInterface[]> {   
    return this.postsService.searchPost(searchPostDto);
  }

  @Get('/user/:userid')
  findPostsByUserId(@Param('userid') userid: string): Promise<PostInterface[]> {
    return this.postsService.findAllPostsByUserId(userid);
  }  

  @Get('/id/:id')
  findPostById(@Param('id') id: string): Promise<PostInterface> {
    return this.postsService.findPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostInterface> {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostInterface> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string): Promise<PostInterface> {
    return this.postsService.removePost(id);
  }
}
