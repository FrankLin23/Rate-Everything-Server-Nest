import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { RegisterInfoDto } from './dto/user.dto';

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

  async addUser(dto: RegisterInfoDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
        email: dto.email,
      },
    });
  }
}
