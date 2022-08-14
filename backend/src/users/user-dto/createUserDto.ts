import { IsByteLength, IsEmail , IsNotEmpty, IS_LENGTH, Length } from 'class-validator';


export class CreateUserDto{
    @IsNotEmpty()
    name : string ; 
    
    @IsEmail()
    email : string ;

    @IsNotEmpty({})
    @Length(5 ,)
    password : string ;
}