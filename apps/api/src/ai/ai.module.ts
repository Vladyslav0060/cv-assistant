import { Global, Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: OpenAI,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const apiKey = cfg.get<string>('OPENAI_API_KEY');
        if (!apiKey) throw new Error('OPENAI_API_KEY is missing');

        return new OpenAI({
          apiKey,
          timeout: cfg.get<number>('OPENAI_TIMEOUT_MS') ?? 20_000,
          maxRetries: cfg.get<number>('OPENAI_MAX_RETRIES') ?? 1,
        });
      },
    },
    AiService,
  ],
  exports: [AiService],
})
export class AiModule {}
