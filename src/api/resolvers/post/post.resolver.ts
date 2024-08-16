import { PostFacade } from '@lib/post/application-services';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { CreatePostInput } from '../inputs';
import { randomUUID } from 'crypto';

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

  @Mutation(() => PostResponse)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: randomUUID(),
    });
  }

  @Mutation(() => PostResponse)
  async setPublished(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id);
  }
}
