import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from './config';
import { GUARDS } from './guards';
import { STRATEGIES } from './strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [AuthService, ...GUARDS, ...STRATEGIES],
  exports: [AuthService],
})
export class AuthModule {}
