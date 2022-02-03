import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: '99999h' }
        })
    ],
    providers: [JwtStrategy]
})
export class AuthModule {}
