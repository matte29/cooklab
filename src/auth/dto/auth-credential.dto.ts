import { isString } from 'util';

import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    username: string;

    @IsString()
    @MinLength(9)
    @MaxLength(80)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'password is too weak you need at least one upper, lower, number or symbol, with a min length of 9',
    })
    password: string;
}
