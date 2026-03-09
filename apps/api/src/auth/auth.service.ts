import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { LogoutResponseDto } from './dto/logout-response.dto';

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

  async logout(req: Request, res: Response): Promise<LogoutResponseDto> {
    return new Promise<LogoutResponseDto>((resolve, reject) => {
      req.logout((err: any) => {
        if (err) {
          return reject(new InternalServerErrorException('Logout failed'));
        }

        req.session?.destroy((sessionErr: any) => {
          if (sessionErr) {
            return reject(
              new InternalServerErrorException('Session destroy failed'),
            );
          }

          res.clearCookie('sid');
          resolve({ ok: true });
        });
      });
    });
  }
}
