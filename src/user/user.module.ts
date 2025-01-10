import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports:[],
  providers: [UserService,PrismaService,TransactionService],
  controllers: [UserController]
})
export class UserModule {}
