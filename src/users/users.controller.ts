import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { UsersService } from './users.service';

import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/searchUsers')
  searchUser():string {
    const name = 'test';
    return name;    
  }
  
  @Get(':id')
  findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created. Type: User.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {    
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<User> {
    return this.usersService.removeUser(id);
  }  


}
