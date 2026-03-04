import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  serializeUser(
    user: any,
    done: (err: Error | null, id?: string) => void,
  ): void {
    // Store only a stable identifier in the session
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error | null, user?: any) => void,
  ): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      const obj = { ...user, test: 'hello' };
      done(null, obj ?? undefined);
    } catch (err) {
      done(err as Error);
    }
  }
}
