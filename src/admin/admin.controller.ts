import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('users')
    async getUsers(): Promise<any> {
        return this.adminService.findAllUsers();
    }

    @Get('posts')
    async getPosts(): Promise<any> {
        return this.adminService.findAllPosts();
    }

    @Delete('/users/:id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        return this.adminService.removeUser(id);
    }

}
