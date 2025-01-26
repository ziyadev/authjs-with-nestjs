import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { prisma } from '@repo/database';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(@Req() req: Request) {
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: req.cookies['authjs.session-token'],
      },
      select: {
        user: true,
      },
    });
    return session?.user;
  }
}
