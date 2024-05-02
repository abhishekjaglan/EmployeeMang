import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor( private readonly usersService: UsersService) {}

    @Get() // GET /users  /users?role=value&age=34 || /users?role=value
    findAll(@Query('role') role?: "INTERN" | 'ENGINEER' | 'ADMIN')
    {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number)
    {
        return this.usersService.findOne(id)
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) user: createUserDto)
    {
        return this.usersService.create(user)
    }
    
    @Patch(':id') //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatedUser: updateUserDto)
    {
        return this.usersService.update(id, updatedUser)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number)
    {
        return this.usersService.delete(id)
    }
}
