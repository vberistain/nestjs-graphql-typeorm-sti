import { applyDecorators, UseGuards } from '@nestjs/common';
import { SignatureGuard } from './signature.guard';

export function Signature() {
    return applyDecorators(UseGuards(SignatureGuard));
}
