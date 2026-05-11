import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { type User } from './interfaces/user.interface';
import { PatchUserDto } from './dto/patch-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Admin } from 'src/auth/decorators/admin.decorator';

@Auth()
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

    @Admin()
    @Post()
    async createUser(
        @Body() dto: CreateUserDto
    ): Promise<User> {
        return await this.usersService.createUser(dto)
    }

    @Admin()
    @Delete(':userId')
    deleteUser(
        @Param('userId') userId: string
    ): User {
        return this.usersService.deleteUser(userId)
    }

    @Admin()
    @Patch(':userId')
    patchUser(
        @Param('userId') userId: string,
        @Body() dto: PatchUserDto
    ): User {
        return this.usersService.patchUser(userId, dto)
    }
}
