import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as signatureModule from 'signature-module';
import type { SignatureModuleInstance } from 'signature-module';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SignatureGuard implements CanActivate {
    signatureService: SignatureModuleInstance;
    constructor() {
        this.signatureService = signatureModule({
            appId: 'appId',
            signatureKey: 'signatureKey'
        });
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        try {
            await this.signatureService.validateSignature(req);
        } catch (e) {
            throw new ApolloError('Signature Not Valid', 'SIGNATURE_NOT_VALID');
        }
        return true;
    }
}
