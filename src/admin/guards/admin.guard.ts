import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    const userId = decoded._id;
    return this.usersService.isUserAdmin(userId);    
  }
}
