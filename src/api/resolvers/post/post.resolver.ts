import { PostFacade } from '@lib/post/application-services';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Query(() => PostResponse, { name: 'getPostById' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Query(() => PaginatedPosts, { name: 'getAllPosts' })
  async getAllPosts(@Args() paginationDto: PaginationDto) {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    // @ts-ignore
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }
}
