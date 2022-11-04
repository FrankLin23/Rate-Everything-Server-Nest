import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { LoginInfoDto } from './dto/user.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByName(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
