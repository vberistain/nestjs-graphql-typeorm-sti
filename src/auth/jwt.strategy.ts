import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UserPayload } from './user-payload.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const PUB_KEY = fs.readFileSync('./keys/dev_rsa.pub.pem', 'utf8');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: PUB_KEY
        });
    }

    async validate(payload: UserPayload): Promise<UserPayload> {
        return payload;
    }
}
