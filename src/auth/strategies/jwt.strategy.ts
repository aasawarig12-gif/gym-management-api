import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    secretOrKey: 'your_secret_key',
    });

    console.log('JWT STRATEGY LOADED');
  }

  async validate(payload: any) {

    console.log('VALIDATE CALLED');

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}