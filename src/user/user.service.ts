import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,private transactionService: TransactionService) {}

  async createUser(
    adminId: number,
    name: string,
    email: string,
    password: string,
    balance: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { name, email, password: hashedPassword, adminId, balance },
    });
  }

  async getUsersByAdmin(adminId: number) {
    return this.prisma.user.findMany({ where: { adminId } });
  }

  // Fetch all users created by a specific admin
  // async getAllUsersByAdmin(adminId: number) {
  //   return this.prisma.user.findMany({
  //     where: { adminId },
  //   });
  // }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({ where: { id: userId } });
  }


  // Transfer money from one user to another (this will use the TransactionService)
  async transferMoney(senderId: number, receiverId: number, amount: number) {
    return this.transactionService.transferMoney(senderId, receiverId, amount);  // Delegating the transfer logic to TransactionService
  }

  // Get transaction history for a user
  async getUserTransactions(userId: number) {
    return this.transactionService.getTransactions(userId);  // Using the TransactionService to fetch transactions
  }

  // Update user balance (if needed in certain scenarios)
  async updateUserBalance(userId: number, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: amount,  // Update the balance
      },
    });
  }
}
