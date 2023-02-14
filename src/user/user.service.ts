import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    /**
     * 이메일 기준 유저 조회
     *
     * @param email
     * @returns
     */
    public async getUserByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    /**
     * 신규 유저 생성
     *
     * @param payload
     * @returns
     */
    public async createUser(payload: CreateUserDto): Promise<User> {
        const { name, email, password } = payload;
        const newUser = await this.usersRepository.save({
            name,
            email,
            password,
        });

        return newUser;
    }
}
