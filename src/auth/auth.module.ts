import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';



import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';




@Module({
  imports:[    
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'PreguntaScereta',
        signOptions: { expiresIn: '1d' },
      }),
    })

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}