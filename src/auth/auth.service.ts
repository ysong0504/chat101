import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly jwtService: JwtService) {}

    /**
     * 회원가입
     *
     * @param payload
     * @returns
     */
    public async register(payload: CreateUserDto) {
        // 중복확인
        const isExist = await this.userService.getUserByEmail(payload.email);
        if (isExist) {
            // 중복 이메일 존재 시 가입 X
            throw new BadRequestException('User already Exists');
        }

        // 비밀번호 암호화 진행
        const hashedPassword = this.getHashedPW(payload.password);

        // 신규 유저 생성
        return this.userService.createUser({
            password: hashedPassword,
            ...payload,
        });
    }

    /**
     * 로그인 진행
     *
     * @param payload
     * @returns
     */
    public async signIn(payload: UserDto) {
        const { email, password } = payload;
        // 유저 정보 확인
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Wrong Account');
        }

        // jwt 발급
        const token = this.createToken(user);
        return { authorization: token };
    }

    /**
     * salt와 bcrypt를 이용하여 비밀번호 암호화
     *
     * @param password
     * @returns
     */
    private async getHashedPW(password: string) {
        // salt와 bcrypt를 이용하여 비밀번호 암호화
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    }

    /**
     * 토큰 발급 (매개변수로 받은 user 정보를 기반으로 토큰을 발행한다.)
     *
     * @param user
     * @returns
     */
    private createToken(user: User): string {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
}
