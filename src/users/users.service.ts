import { UserDto } from 'src/dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(userName: string) {
    return this.userModel.findOne({ userName });
  }

  async create(createUser: UserDto) {
    const newUser = new this.userModel(createUser);
    return newUser.save();
  }
}
