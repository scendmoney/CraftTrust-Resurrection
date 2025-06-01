import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { CONFIG } from './config';
import AppModule from './index';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import LoggingInterceptor from '@common/interceptor/log';
import { SentryInterceptor } from 'libs/sentry/src/sentry.interceptor';
import { UniqueConstraintFilter } from './utils/index_filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const logger = app.get(ConsoleLogger);

  app.set('trust proxy', 1);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.enableCors();
  // END CORS
  app.use(cookieParser());
  // app.use(
  //   expressSession({
  //     secret: "not my cat's name",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       maxAge: 60 * 60 * 1000, // 1 hour
  //       // secure: true, // Uncomment this line to enforce HTTPS protocol.
  //       sameSite: true,
  //     },
  //   }),
  // );
  app.use(
    graphqlUploadExpress({ maxFileSize: 1024 * 1024 * 1024, maxFiles: 500 }),
  );
  app.useStaticAssets(join(__dirname, '..', '../public'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters();
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new SentryInterceptor(process.env.PLATFORM_ENV || 'local'),
  );
  app.useGlobalFilters(new UniqueConstraintFilter());
  const config = new DocumentBuilder()
    .setTitle('ICO REST API')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(CONFIG.platform.port);
}
bootstrap();
