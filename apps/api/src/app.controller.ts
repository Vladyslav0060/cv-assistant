import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: any): string {
    return this.appService.getHello();
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  me(@Req() req: any, @Session() session: any) {
    return { user: req.user, auth: req.isAuthenticated?.(), session };
  }
}
