import { Injectable, UnauthorizedException } from '@nestjs/common';
import { type LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { type User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(
        dto: LoginDto
    ) {
        const { name, password } = dto

        const user = await this.usersService.getUserByName(name)

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload: JwtPayload = { role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(
        dto: RegisterDto
    ) {
        const { name, password } = dto

        const user: User = await this.usersService.createUser({
            name: name,
            password: password,
        })

        return user
    }
}
