```
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { HttpException } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Job, Queue } from 'bull';
import {
  RedisCacheService,
  RedisGraphqlService,
  RedisTransportService,
} from 'libs/redis/src';

class CurrencyDTO {
  id: number;
  symbol: string;
}

const DATA: CurrencyDTO = {
  id: 1,
  symbol: 'USD',
};

export class RedisExampleTransport {
  constructor(private readonly redisTransportService: RedisTransportService) {}

  //sending data while waiting for a response
  async testTransportSend(): Promise<CurrencyDTO> {
    try {
      // method 1
      const resultPromise =
        await this.redisTransportService.sendPromise<CurrencyDTO>(
          'currency',
          DATA,
        );

      // method 2
      const resultObserver = this.redisTransportService
        .send<CurrencyDTO>('currency', DATA)
        .subscribe({
          next: (result) => {
            // Here you process the received result (result)
            console.log('Result:', result);
          },
          error: (error) => {
            // Here you handle an error if it occurs
            console.error('Error:', error);
          },
          complete: () => {
            // Handle Observable completion here if necessary
            console.log('Observable completed');
          },
        });

      return resultPromise;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  // sending data without waiting for a response
  async testTransportEmit(): Promise<boolean> {
    try {
      this.redisTransportService.emit('currency', DATA);

      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  // data acceptance
  @MessagePattern('Name topic')
  async testTransportResponse(@Payload() data: CurrencyDTO) {
    return data;
  }
}

export class RedisExampleCache {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getByKey(key = `currency`) {
    return await this.redisCacheService.get<CurrencyDTO>(key);
  }

  setByKey(key = `currency`, data = DATA) {
    this.redisCacheService.set<CurrencyDTO>(key, data);
  }
}

export class RedisExampleGraphql {
  constructor(private readonly redisGraphqlService: RedisGraphqlService) {}

  async publish() {
    await this.redisGraphqlService.publish('currencyUpdated', DATA);
  }

  @Subscription(() => CurrencyDTO, {
    name: 'currencyUpdated',
    filter: async (__, _, context) => !!context?.user,
    resolve: (data) => data,
  })
  currency() {
    return this.redisGraphqlService.asyncIterator<CurrencyDTO>(
      'currencyUpdated',
    );
  }
}

// create JOB
export class CurrencyJob {
  constructor(@InjectQueue('queue') private readonly queue: Queue) {}

  async currencyJob(data = DATA) {
    try {
      this.queue.add('currencyJob', data, { delay: 60000 });
    } catch (error) {
      console.log('currencyJob', error.message);
    }
  }
}

// listen JOB
@Processor('queue')
export class CurrencyQueue {
  @Process('currencyJob')
  async currencyJob({ data }: Job) {
    console.log(data);
  }
}


```
