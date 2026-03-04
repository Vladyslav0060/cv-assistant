import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from 'generated/prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Local Strategy Login' })
  @ApiBody({
    description: 'Payload for logging in',
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Example User',
        value: {
          email: 'john.doe@example.com',
          password: '123',
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Payload for creating a user',
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Example User',
        value: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: '',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() createUserDto: CreateUserDto): any {
    return this.authService.register(createUserDto);
  }

  @Post('logout')
  logout(@Req() req: any, @Res() res: any) {
    req.logout((err: any) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });

      req.session.destroy((err: any) => {
        if (err)
          return res.status(500).json({ message: 'Session destroy failed' });

        res.clearCookie('sid'); // если ты указал name: 'sid'
        // иначе: res.clearCookie('connect.sid')
        return res.json({ ok: true });
      });
    });
  }
}
