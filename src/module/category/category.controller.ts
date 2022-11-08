import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createCategoryDto } from './dto/category';

@Controller()
export class CategoryController {
  constructor() {}

  @Get(':tag/create')
  async createCategory(@Param() tag: string, @Body() dto: createCategoryDto) {}

  @Get(':tag/get')
  async getCategory(@Param() tag: string) {}
}
