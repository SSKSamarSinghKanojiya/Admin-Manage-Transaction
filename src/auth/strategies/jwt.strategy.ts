import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: 'your-secret-key', // Replace with your secret key (use environment variables for better security)
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Data available after token validation
  }
}
