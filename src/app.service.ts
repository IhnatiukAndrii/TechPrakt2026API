import { Injectable, NotFoundException } from '@nestjs/common';
import { type User } from './interfaces/user.interface';
import { type CreateUserDto } from './dto/create-user.dto';
import { type PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class AppService {
    private users = [
        {
            id: '0',
            name: 'user0'
        },
        {
            id: '1',
            name: 'user1'
        },
        {
            id: '2',
            name: 'user2'
        },
        {
            id: '3',
            name: 'user3'
        },
        {
            id: '4',
            name: 'user4'
        },
        {
            id: '5',
            name: 'user5'
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

    createUser(dto: CreateUserDto): User {
        const { name } = dto

        // create user in db

        return {
            id: "10",
            name: name
        }
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
            'name': name
        }
    }
}
