import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import * as passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

const PORT = process.env.PORT ?? 5050;

const REDIS_URL =
  process.env.REDIS_URL ??
  (process.env.REDIS_HOST && process.env.REDIS_PORT
    ? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    : undefined);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CV Assistant')
    .setVersion('1.0')
    .addTag('cv_assistant')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(cookieParser(process.env.APP_SECRET));

  // Redis-backed sessions (recommended for both dev and prod)
  if (!REDIS_URL) {
    throw new Error(
      'REDIS_URL is not set. Provide REDIS_URL or REDIS_HOST and REDIS_PORT.',
    );
  }

  const redisClient = createClient({ url: REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'cv:sess:',
  });

  app.use(
    session({
      secret: process.env.APP_SECRET as string,
      resave: false,
      saveUninitialized: false,
      store: redisStore,
      name: 'sid',
      rolling: true,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: ['http://localhost:3000'],
    // origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  await app.listen(PORT).then(() => console.log(`Started on ${PORT}`));
}
bootstrap();
