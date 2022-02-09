import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private publicKey: string;
    constructor() {
        // this.publicKey = readFileSync('./keys/dev_rsa.pub.pem', 'utf8');
        this.publicKey = 'dfdjksfs';
    }

    /**
     * Verifies the token and all required parameterrs in there.
     *
     * @param {string} token
     * @param {object}
     * @returns {boolean | Object}
     */
    async verifyToken(token): Promise<any> {
        const res = await verify(token, this.publicKey);
        return res;
    }
}
