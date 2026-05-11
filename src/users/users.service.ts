import { type User } from './interfaces/user.interface';
import { type PatchUserDto } from './dto/patch-user.dto';
import { type CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: '0',
            name: 'user0',
            passwordHash: '1',
            role: Role.USER,
        },
        {
            id: '1',
            name: 'user1',
            passwordHash: '1',
            role: Role.USER,
        },
        {
            id: '2',
            name: 'user2',
            passwordHash: '1',
            role: Role.USER,
        },
        {
            id: '3',
            name: 'user3',
            passwordHash: '1',
            role: Role.USER,
        },
        {
            id: '4',
            name: 'user4',
            passwordHash: '1',
            role: Role.USER,
        },
        {
            id: '5',
            name: 'user5',
            passwordHash: '1',
            role: Role.USER,
        },
    ]

    getUsers(): User[] {
        return this.users
    }

    getUser(userId: string): User {
        const user = this.users.find((user) => user.id === userId)

        if (!user) {
            throw new NotFoundException('User is not found')
        }

        return user
    }

    getLastUserId(): string {
        return this.users[this.users.length - 1].id
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const { name, password } = dto

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const lastId = this.getLastUserId()
        const userId = Number(lastId) + 1

        const user: User = {
            id: String(userId),
            name: name,
            passwordHash: passwordHash,
            role: Role.USER
        }

        this.users.push(user)

        return user
    }

    deleteUser(userId: string): User {
        const user = this.users.find((user) => user.id === userId)

        if (!user) {
            throw new NotFoundException('User is not found')
        }

        // delete user in db

        return user
    }

    patchUser(userId: string, dto: PatchUserDto): User {
        const { name } = dto

        const user = this.users.find((user) => user.id === userId)

        if (!user) {
            throw new NotFoundException('User is not found')
        }

        // patch user in db

        return {
            'id': user.id,
            'name': name,
            'passwordHash': user.passwordHash,
            'role': user.role,
        }
    }

    async getUserByName(name: string): Promise<User> {
        const user = this.users.find((user) => user.name === name)

        if (!user) {
            throw new NotFoundException('User is not found')
        }

        return user
    }

}
