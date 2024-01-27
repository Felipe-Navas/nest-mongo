import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(userName: string, pass: string) {
    const user = await this.usersService.findOne(userName);

    if (!user) throw new NotFoundException('User not found');
    if (user?.password !== pass)
      throw new UnauthorizedException('Password not valid');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here instead of the user object
    return result;
  }
}
