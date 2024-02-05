import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwtPayload.interface';

 @Injectable()
 export class AuthService {
  constructor(     
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<{ _id:string}> {    
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return null;
   }
   const passwordsMatch = await bcrypt.compare(password, user.password);
    if (user.email.toLowerCase() === email.toLowerCase() && passwordsMatch) {      
      return { _id: user._id };   
    }
    console.log('fallo validateUser');
    return null;
  }

  async login(user: JwtPayload):Promise<{ access_token: string }> {
    const payload = {
      '_id': user._id,
    };
    const access_token = await this.jwtService.signAsync(payload);
//    const decoded = await this.jwtService.decode(access_token);
//    console.log(decoded);
    return {
      access_token: access_token
 //     decoded: decoded
    };
  }
 }
