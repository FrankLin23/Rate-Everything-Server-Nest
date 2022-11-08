import { Injectable } from '@nestjs/common';
import { Moment } from '@prisma/client';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/prisma.service';
import { PostMomentDto } from './moment.dto';

@Injectable()
export class MomentService {
  private cursor: number;

  constructor(private prisma: PrismaService) {
    this.cursor = 1;
  }

  async getTenMoments() {
    const res = await this.prisma.moment.findMany({
      take: 2,
      skip: 1,
      cursor: {
        id: this.cursor,
      },
    });
    this.cursor = res[res.length - 1].id;
    return res;
  }

  async postMoment(dto: PostMomentDto): Promise<Moment | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (isEmpty(user)) {
      return null;
    }
    return await this.prisma.moment.create({
      data: {
        content: dto.content,
        authorId: user.id,
      },
    });
  }
}
