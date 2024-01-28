import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findOne(@Body() body: UserDto) {
    const { userName, password } = body;
    const user = await this.usersService.findOne(userName);
    if (!user) throw new NotFoundException('User not found');
    if (user?.password !== password)
      throw new UnauthorizedException('Password not valid');

    return user;
  }

  @Public()
  @Post()
  async create(@Body() body: UserDto) {
    try {
      return await this.usersService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }
}
