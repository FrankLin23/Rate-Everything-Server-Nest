import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import { LoginInfoDto, RegisterInfoDto } from './dto/user.dto';
import { UserService } from 'src/module/user/user.service';
import { ResOp, response } from 'src/common/response';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginInfoDto): Promise<ResOp> {
    const user = await this.userService.findUserByName(dto.username);
    const token = await this.authService.createToken(user);
    return response({ data: token });
  }

  @Post('register')
  async register(@Body() dto: RegisterInfoDto): Promise<ResOp> {
    const existUser = await this.userService.findUserByName(dto.username);
    if (!isEmpty(existUser)) {
      return response({ message: '用户已存在' });
    }
    await this.userService.addUser(dto);
    return response({ message: '注册成功' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() request: Request): Promise<ResOp> {
    const token = request.headers.authorization;
    const result = await this.authService.verifyToken(token);
    const user = await this.userService.findUserByName(result.username);
    const currentUser = {
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      profile: user.profile,
      avatar: user.avatar,
    };
    return response({ data: currentUser, message: '获取用户信息成功' });
  }

  @Post('update_avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
