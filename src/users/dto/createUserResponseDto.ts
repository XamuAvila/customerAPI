import { user } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUserResponseDto {
    id: string;
    login: string;

    constructor(id: string, login: string) {
        this.id = id;
        this.login = login;
    }

    static create(userModel: user): CreateUserResponseDto {
        return new CreateUserResponseDto(userModel.id, userModel.login);
    }
}
