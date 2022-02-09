import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { UserPayload } from './user-payload.entity';

const publicKey = readFileSync('./keys/dev_rsa.pub.pem', 'utf8');

@Injectable()
export class AuthService {
    private getTokenFromRequest(req: Request) {
        const authHeader = req.headers['authorization'];
        return authHeader.substr(7);
    }

    verifyTokenFromRequest(req: Request): UserPayload {
        const token = this.getTokenFromRequest(req);
        return verify(token, publicKey) as UserPayload;
    }
}
