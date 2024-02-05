import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController { 
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @ApiResponse({ status: 201, description: 'The user has been successfully logged in.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})    
    login(@Request() req) {
     return this.authService.login(req.user);
    }
}
