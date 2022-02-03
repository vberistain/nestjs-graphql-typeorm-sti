import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SignatureModule } from './signature/signature.module';

@Module({})
export class SecurityModule {
    imports: [AuthModule, SignatureModule];
}
