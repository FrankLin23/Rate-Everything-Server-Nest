import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { response } from 'src/common/response';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostMomentDto } from './moment.dto';
import { MomentService } from './moment.service';

@Controller('moment')
export class MomentController {
  constructor(
    private readonly momentService: MomentService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMoments() {
    const result = await this.momentService.getTenMoments();
    return response({ data: result });
  }

  @Post('post')
  @UseGuards(JwtAuthGuard)
  async postMoment(@Body() dto: PostMomentDto) {
    const result = await this.momentService.postMoment(dto);
    return response({ data: result });
  }
}
