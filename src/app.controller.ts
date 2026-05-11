import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { type User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getUsers(): User[] {
        return this.appService.getUsers()
    }

    @Get(':userId')
    getUser(
        @Param('userId') userId: string
    ): User {
        return this.appService.getUser(userId)
    }

    @Post()
    createUser(
        @Body() dto: CreateUserDto
    ): User {
        return this.appService.createUser(dto)
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') userId: string
    ): User {
        return this.appService.deleteUser(userId)
    }

    @Patch(':userId')
    patchUser(
        @Param('userId') userId: string,
        @Body() dto: PatchUserDto
    ): User {
        return this.appService.patchUser(userId, dto)
    }

}
