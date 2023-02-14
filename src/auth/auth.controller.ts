import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { CreateUserDto, UserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 회원가입
     *
     * @param createUserDto
     * @returns
     */
    @ApiOperation({ description: '회원가입' })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.register(createUserDto);
    }

    /**
     * 로그인
     *
     * @param loginUserDto
     * @returns
     */
    @ApiOperation({ description: '로그인' })
    @Post('login')
    async signIn(@Body() loginUserDto: UserDto): Promise<{ authorization: string }> {
        return this.authService.signIn(loginUserDto);
    }
}
