import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
    constructor(
        private usersService: UsersService,
        private postsService: PostsService
    ) {}

    findAllUsers(): Promise<any>{
        return this.usersService.findAllUsers();
    }

    findAllPosts(): Promise<any>{
        return this.postsService.findAllPosts();
    }

    removeUser(id: string): Promise<any>{
        return this.usersService.removeUser(id);
    }
}
