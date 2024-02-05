import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwtPayload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'PreguntaScereta',
    });
  }

    async validate(payload: JwtPayload) {
    console.log('payloadx:', payload);    
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { '_id': payload._id  };
  }
}
