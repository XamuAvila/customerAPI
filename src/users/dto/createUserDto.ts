import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    login: string

    @IsString()
    @IsNotEmpty()
    password: string
}
