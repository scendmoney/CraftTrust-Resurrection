import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG } from '@config/index';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: CONFIG.platform.key,
    }),
    PassportModule,
  ],
  providers: [AuthService, ConsoleLogger],
  exports: [AuthService],
})
export default class AuthModule {}
