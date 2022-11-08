import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { MomentModule } from './module/moment/moment.module';
import { UserModule } from './module/user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, AuthModule, MomentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
