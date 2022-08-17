import { IsNotEmpty, isNotEmpty, IsNumber, IS_EMAIL } from "class-validator";


export class createProductDto {
    @IsNotEmpty()
    name : string ;
    price : number;
    discount : number ; 
    color : string; 
    size : number;
    top : boolean ;
    @IsNotEmpty()
    description : string ;
}