import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string) {
    const user = await this.usersService.findOne(userName);

    if (!user) throw new NotFoundException('User not found');
    if (user?.password !== pass)
      throw new UnauthorizedException('Password not valid');

    const payload = { sub: user._id, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
