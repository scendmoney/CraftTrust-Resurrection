import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver } from '@nestjs/apollo';
import { CONFIG } from './config';
import entities from './entities';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService, RedisModule } from '../libs/redis/src';
import { MetrcModule } from 'libs/metrc/src';
import { TwilioModule } from 'libs/twilio/src';
import { StorageModule } from 'libs/storage/src';
import { DeepPartial } from 'typeorm';
import { UserModel } from '@entities/user/user.model';
import { RedisCacheKeysEnum } from '@enums/common';
import ErrorMsgEnum from '@enums/error';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';
import { PinataModule } from 'libs/pinata/src';
import { HederaModule } from 'libs/hedera/src';
import { TransakModule } from 'libs/transak/src';
import { SentryGlobalModule } from 'libs/sentry/src';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@common/logger';
import { CustomerioModule } from 'libs/customerio/src';
import { DiamondstandardModule } from 'libs/diamondstandard/src';

@Module({
  imports: [
    LoggerModule,
    EventEmitterModule.forRoot(),
    CustomerioModule.register(CONFIG.customerIo),
    StorageModule.register(CONFIG.gcs),
    RedisModule.register(CONFIG.redis),
    DiamondstandardModule.register(CONFIG.diamondstandard),
    PinataModule.register(CONFIG.pinata),
    MetrcModule.register(CONFIG.metrc),
    TwilioModule.register(CONFIG.twilio),
    TransakModule.register(CONFIG.transak),
    HederaModule.register(CONFIG.hedera),
    SentryGlobalModule.register(CONFIG.sentry),
    GoogleRecaptchaModule.forRoot({
      secretKey: CONFIG.google.recaptchaSecretKey,
      response: (req: IncomingMessage) =>
        (req.headers.recaptcha || '').toString(),
      score: 0.5,
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      store: 'memory',
      isGlobal: true,
      ttl: 0,
    }),
    TypeOrmModule.forRoot(CONFIG.database),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: entities,
      useFactory: (redisService: RedisCacheService) => ({
        include: entities,
        ...CONFIG.graphql,
        context: ({ req }) => {
          return { token: req.headers.authorization?.replace('Bearer ', '') };
        },
        subscriptions: {
          keepAlive: 5000,
          'subscriptions-transport-ws': {
            path: CONFIG.graphql.path,
            onConnect: async (connectionParams) => {
              if (!connectionParams.authorization) {
                throw new Error(ErrorMsgEnum.InvalidToken);
              }
              const keys = await redisService.keys(
                `${RedisCacheKeysEnum.users}:${connectionParams.authorization}*`,
              );
              let userRedis = null;

              if (keys.length) {
                userRedis = await redisService.get<DeepPartial<UserModel>>(
                  keys[0],
                );
              }

              if (!userRedis) {
                throw new Error(ErrorMsgEnum.UserNotExist);
              }

              return { user: userRedis };
            },
          },
        },
      }),
      inject: [RedisCacheService],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
