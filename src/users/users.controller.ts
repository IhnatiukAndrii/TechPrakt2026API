import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { type User } from './interfaces/user.interface';
import { PatchUserDto } from './dto/patch-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    getUsers(): User[] {
        return this.usersService.getUsers()
    }

    @Get(':userId')
    getUser(
        @Param('userId') userId: string
    ): User {
        return this.usersService.getUser(userId)
    }

    @Post()
    createUser(
        @Body() dto: CreateUserDto
    ): User {
        return this.usersService.createUser(dto)
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') userId: string
    ): User {
        return this.usersService.deleteUser(userId)
    }

    @Patch(':userId')
    patchUser(
        @Param('userId') userId: string,
        @Body() dto: PatchUserDto
    ): User {
        return this.usersService.patchUser(userId, dto)
    }
}
