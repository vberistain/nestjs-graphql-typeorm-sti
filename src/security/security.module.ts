import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { SignatureModule } from './signature/signature.module';

@Module({})
export class SecurityModule {
    imports: [AuthModule, SignatureModule];
    providers: [AuthService];
    exports: [AuthService];
}
