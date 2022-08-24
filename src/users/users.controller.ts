import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserResponseDto } from './dto/createUserResponseDto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signin')
    async signin(@Body() signinParams: CreateUserDto) : Promise<CreateUserResponseDto> {
        return this.usersService.signin(signinParams);
    }
}
