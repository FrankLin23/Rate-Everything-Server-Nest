import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategoryByTag(tag: string) {
    if (tag === 'entertainment') {
    } else if (tag === 'destination') {
    }
  }
}
