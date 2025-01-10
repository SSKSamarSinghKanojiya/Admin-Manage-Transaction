import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Adjust the path if needed
import { UseGuards } from '@nestjs/common';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() { adminId, name, email, password, balance }: { adminId: number; name: string; email: string; password: string, balance: number},
  ) {
    return this.userService.createUser(adminId, name, email, password,balance);
  }
  
  // @Get(':adminId')
  // async getUsers(@Param('adminId') adminId: number) {
  //   return this.userService.getUsersByAdmin(adminId);
  // }
  @Get(':adminId')
  @UseGuards(JwtAuthGuard) // Protect this route
  async getUsers(@Param('adminId',ParseIntPipe) adminId: number) {
    return this.userService.getUsersByAdmin(adminId);
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
