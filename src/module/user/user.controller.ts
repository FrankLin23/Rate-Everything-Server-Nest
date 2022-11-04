import { Body, Controller, Get, Post } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { LoginInfoDto } from './dto/user.dto';
import { UserService } from 'src/module/user/user.service';
import { response } from 'src/common/response';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginInfoDto) {
    const user = await this.userService.findUserByName(dto.username);
    if (isEmpty(user)) {
      return response({ message: '用户不存在' });
    }
    if (dto.password !== user.password) {
      return response({ message: '密码错误' });
    }
    const token = await this.authService.createToken(dto.username);
    return response({ data: token });
  }

  @Post('register')
  async register() {}

  @Get('me')
  async getCurrentUser() {}

  @Post('update_avatar')
  async updateAvatar() {}
}
