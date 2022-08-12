import { ValidationError } from '@nestjs/common';
import { ValidatorOptions  } from 'class-validator'
export interface ValidatiobPipeOptions extends ValidatorOptions{
    transform? : boolean ;
    disableErrorMessages? : boolean ;
    exceptionFactory? : (errors:ValidationError[])=> any;
}