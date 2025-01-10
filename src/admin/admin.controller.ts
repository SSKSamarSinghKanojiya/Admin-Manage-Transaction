import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  async register(@Body() { name ,email, password }: { name:string,email: string; password: string }) {
    return this.adminService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    const admin = await this.adminService.validateAdmin(email, password);
    if (!admin) {
      throw new Error('Invalid credentials');
    }
    return this.adminService.login(admin);
  }
}
