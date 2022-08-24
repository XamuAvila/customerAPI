import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [
    AppController,
    CustomerController,
    UsersController
  ],
  imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    AuthModule,
    UsersModule
  ],
  providers:[
    PrismaService,
    CustomerService,
    AuthService,
    UsersService,
    JwtService
  ]
})
export class AppModule { }
