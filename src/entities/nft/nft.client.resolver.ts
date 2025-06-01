import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthGuardClient } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import QueryService from '@common/query';
import NFTModel from './nft.model';
import { NFTsModelDTO } from './nft.dto';
import { NFTStatusEnum } from './nft.enum';

@Resolver(() => NFTModel)
export class NFTClientResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => NFTsModelDTO, {
    description: '@public - nfts client',
  })
  @UseGuards(AuthGuardClient)
  async clientNfts(
    @Args('payload', { type: () => FilterGetDTO })
    payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<NFTsModelDTO> {
    return QueryService.list<NFTsModelDTO>(
      this.dataSource.getRepository(NFTModel),
      {
        payload,
        relations,
      },
      {
        user: {
          id: user.id,
        },
      },
    );
  }

  @Query(() => NFTModel, {
    description: '@protected - Get nft by ID (by user client)',
  })
  @UseGuards(AuthGuardClient)
  async nftByIdClient(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations, user },
  ): Promise<NFTModel> {
    return QueryService.item<NFTModel>(
      this.dataSource.getRepository(NFTModel),
      {
        payload,
        relations,
      },
      {
        id: payload.id,
        user: {
          id: user.id,
        },
        status: NFTStatusEnum.done,
      },
    );
  }
}
