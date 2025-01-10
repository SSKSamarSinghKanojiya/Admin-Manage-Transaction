import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [AdminService,PrismaService],
  controllers: [AdminController]
})
export class AdminModule {}
