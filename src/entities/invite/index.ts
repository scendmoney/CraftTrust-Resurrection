import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InviteModel } from './invite.model';
import { InviteResolver } from './invite.resolver';
import { CustomerIoDataModule } from '@entities/customerio';
@Module({
  imports: [TypeOrmModule.forFeature([InviteModel]), CustomerIoDataModule],
  providers: [InviteResolver],
})
export class InviteModule {}
