import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [MomentController],
  providers: [MomentService, PrismaService],
})
export class MomentModule {}
