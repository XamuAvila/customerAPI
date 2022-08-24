import { CreateUserDto } from './dto/createUserDto';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from './dto/createUserResponseDto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async signin(data: CreateUserDto): Promise<CreateUserResponseDto> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const createdUser = await this.prisma.user.create({
            data: {
                login: data.login,
                password: hashedPassword
            }
        });
        return CreateUserResponseDto.create(createdUser);
    }

    async findOne(username: string): Promise<user | null> {
        return this.prisma.user.findFirst({ where: { login: username } });
    }
}
