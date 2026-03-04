import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    const { credential, ...result } = user;
    return result;
  }

  async login({ email, password }: LoginDto): Promise<User> {
    const user = await this.userService.findUserWithCredentials({
      email,
    });

    if (user && user.credential?.passwordHash) {
      const userPassword = await argon.verify(
        user.credential?.passwordHash,
        password,
      );

      if (!userPassword) throw new ForbiddenException('Invalid Credentials');
      const { credential, ...result } = user;
      return result;
    }

    throw new NotFoundException("User doesn't exist");
  }
}
