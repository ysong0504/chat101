import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty({ description: '유저 이메일', uniqueItems: true })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: '유저 비밀번호' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class CreateUserDto extends UserDto {
    @ApiProperty({ description: '유저 이름' })
    @IsString()
    readonly name: string;
}
