import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

type AskOptions = {
  system?: string;
  maxOutputTokens?: number;
  highQuality?: boolean;
};

@Injectable()
export class AiService {
  constructor(
    private readonly client: OpenAI,
    private readonly cfg: ConfigService,
  ) {}
  async ask(input: string, opts: AskOptions = {}) {
    const small = this.cfg.get<string>('OPENAI_SMALL_MODEL') ?? 'gpt-5.2-mini';
    const big = this.cfg.get<string>('OPENAI_DEFAULT_MODEL') ?? 'gpt-5.2';

    const model = opts.highQuality ? big : small;

    const maxOutputTokens = opts.maxOutputTokens ?? 300; // ⭐ hard cap: biggest saver

    const res = await this.client.responses.create({
      model,
      // “instructions” acts like your system prompt in Responses API
      // instructions:
      //   opts.system ?? 'Answer briefly. If unsure, ask one question.',
      // input,
      input: [
        { role: 'system', content: opts.system || '' },
        { role: 'user', content: input },
      ],
      // Depending on SDK/version this may be `max_output_tokens` or similar; if TS complains,
      // keep the cap in your prompt and/or use the per-request options your SDK exposes.
      max_output_tokens: maxOutputTokens as any,
    });

    return {
      text: res.output_text,
      requestId: (res as any)._request_id,
      model,
    };
  }
}
