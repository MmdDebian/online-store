import { IsEmail, IsNotEmpty, Length } from 'class-validator' ;

export class RegisterDto {
    @IsNotEmpty()
    name : string 

    @IsNotEmpty()
    @IsEmail()
    email : string 

    @IsNotEmpty()
    @Length(5 , 200)
    password : string
} 