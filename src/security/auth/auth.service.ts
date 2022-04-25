import { Injectable } from '@nestjs/common';
import { verify, sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { UserPayload } from './user-payload';
import * as deepmerge from 'deepmerge';
import * as moment from 'moment';
import { randomUUID } from 'crypto';

const publicKey = readFileSync('./keys/dev_rsa.pub.pem', 'utf8');
const privateKey = readFileSync('./keys/dev_rsa.pem', 'utf8');

@Injectable()
export class AuthService {
    private issuingDeltaInSeconds: number = 5;
    private expiryDeltaInSeconds: number = 365 * 24 * 60 * 60;
    private getHeader() {
        return {
            alg: 'RS512',
            type: 'JWS'
        };
    }

    private addClaims(payload) {
        const claims = {
            jti: randomUUID(),
            iat: moment().subtract(this.issuingDeltaInSeconds, 'seconds').unix(),
            exp: moment().add(this.expiryDeltaInSeconds, 'seconds').unix()
        };

        return deepmerge(this.clean(payload), claims);
    }

    private clean(payload) {
        const cPayload = {};
        Object.keys(payload)
            .filter((key) => !['jti', 'iat', 'exp'].includes(key))
            .forEach((key) => {
                cPayload[key] = payload[key];
            });

        return cPayload;
    }

    private validatePayload(payload) {
        const oPayload = this.addClaims(payload);
        return JSON.stringify(oPayload);
    }

    private getTokenFromRequest(req: Request) {
        const authHeader = req?.headers['authorization'];
        return authHeader?.substr(7);
    }

    verifyTokenFromRequest(req: Request): UserPayload {
        const token = this.getTokenFromRequest(req);
        return verify(token, publicKey) as UserPayload;
    }

    generateToken(payload) {
        const oHeader = this.getHeader();
        const sPayload = this.validatePayload(payload);

        return sign(sPayload, privateKey, { header: oHeader });
    }
}
