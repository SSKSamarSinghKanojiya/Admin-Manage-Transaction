// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { UserService } from '../user/user.service'; // Assuming you have this service

// @Injectable()
// export class TransactionService {
//   constructor(private prisma: PrismaService) {}

//   // Transfer money from one user to another
//   async transferMoney(senderId: number, receiverId: number, amount: number) {
//     const sender = await this.prisma.user.findUnique({ where: { id: senderId } });
//     const receiver = await this.prisma.user.findUnique({ where: { id: receiverId } });

//     if (!sender || !receiver) {
//       throw new Error('Sender or Receiver not found');
//     }

//     if (sender.balance < amount) {
//       throw new Error('Insufficient balance');
//     }

//     // Update balances
//     await this.prisma.user.update({
//       where: { id: senderId },
//       data: { balance: sender.balance - amount },
//     });

//     await this.prisma.user.update({
//       where: { id: receiverId },
//       data: { balance: receiver.balance + amount },
//     });

//     // Create a transaction record
//     await this.prisma.transaction.create({
//       data: {
//         senderId,
//         receiverId,
//         amount,
//       },
//     });

//     return { message: 'Transaction successful' };
//   }

//   // Get all transactions for a specific user
//   async getTransactions(userId: number) {
//     return this.prisma.transaction.findMany({
//       where: {
//         OR: [
//           { senderId: userId },
//           { receiverId: userId }
//         ],
//       },
//       include: {
//         sender: true,
//         receiver: true,
//       },
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  // Transfer money from one user to another
  async transferMoney(senderId: number, receiverId: number, amount: number) {
    const sender = await this.prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await this.prisma.user.findUnique({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found');
    }

    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Update sender's balance
    await this.prisma.user.update({
      where: { id: senderId },
      data: { balance: sender.balance - amount },
    });

    // Update receiver's balance
    await this.prisma.user.update({
      where: { id: receiverId },
      data: { balance: receiver.balance + amount },
    });

    // Log the transaction
    await this.prisma.transaction.create({
      data: {
        senderId,
        receiverId,
        amount,
      },
    });

    return { message: 'Transaction successful' };
  }

  // Get all transactions for a specific user
  async getTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: true,  // Include sender details
        receiver: true,  // Include receiver details
      },
    });
  }
}
