import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(name:string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.admin.create({
      data: { name,email, password: hashedPassword },
    });
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
