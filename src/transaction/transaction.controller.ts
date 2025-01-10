// import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
// import { TransactionService } from './transaction.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming you're using this guard

// @Controller('transactions')
// export class TransactionController {
//   constructor(private readonly transactionService: TransactionService) {}

//   // Endpoint to transfer money between users
//   @Post('transfer')
//   @UseGuards(JwtAuthGuard) // Protect the route with JWT
//   async transferMoney(
//     @Body() body: { senderId: number, receiverId: number, amount: number }
//   ) {
//     return this.transactionService.transferMoney(body.senderId, body.receiverId, body.amount);
//   }

//   // Endpoint to get all transactions for a specific user
//   @Get('user/:userId')
//   @UseGuards(JwtAuthGuard)
//   async getTransactions(@Param('userId') userId: number) {
//     return this.transactionService.getTransactions(userId);
//   }
// }

import { Controller, Post, Body, Param, Get, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';  // Assuming you're using JWT authentication

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // Route for transferring money
  @Post('transfer')
  @UseGuards(JwtAuthGuard)  // Apply the JWT authentication guard
  async transferMoney(
    @Body() body: { senderId: number, receiverId: number, amount: number }
  ) {
    return this.transactionService.transferMoney(body.senderId, body.receiverId, body.amount);
  }

  // Route for getting user transactions
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)  // Apply the JWT authentication guard
  async getTransactions(@Param('userId',ParseIntPipe) userId: number) {
    return this.transactionService.getTransactions(userId);
  }
}
