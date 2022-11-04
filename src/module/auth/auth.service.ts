import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async createToken(username: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    return this.jwtService.sign({
      username,
      sub: user.id,
    });
  }
}
