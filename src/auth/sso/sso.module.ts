import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SsoService } from './sso.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  providers: [SsoService]
})
export class SsoModule { }
