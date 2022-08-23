import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsInt()
    @IsNotEmpty()
    document:number
}
