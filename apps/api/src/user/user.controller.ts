/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Payload for creating a user',
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Example User',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: '',
        },
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', example: '1', required: true })
  @ApiBody({
    description: 'Payload for updating a user',
    type: UpdateUserDto,
    examples: {
      default: {
        summary: 'Example User',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User has been deleted' })
  @ApiParam({ name: 'id', example: '1', required: true })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user data' })
  @ApiParam({ name: 'id', example: '1', required: true })
  @ApiOkResponse({ description: 'User has been found' })
  async findUserById(@Param('id') id: string) {
    return this.userService.findUser({ id });
  }
}
