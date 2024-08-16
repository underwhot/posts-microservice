import { PostFacade } from '@lib/post/application-services';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedPosts, PostResponse } from '../responses';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { CreatePostInput, UpdatePostInput } from '../inputs';
import {} from 'crypto';
import { GqlCurrentUser, ICurrentUser, Public } from '@lib/auth';
import { GqlGuard } from '@lib/auth/guards/gql.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlGuard)
@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Public()
  @Query(() => PostResponse, { name: 'getPostById' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Public()
  @Query(() => PaginatedPosts, { name: 'getAllPosts' })
  async getAllPosts(@Args() paginationDto: PaginationDto) {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @Mutation(() => PostResponse)
  async createPost(
    @GqlCurrentUser() currentUser: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: currentUser.userId,
    });
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @GqlCurrentUser() currentUser: ICurrentUser,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePostInput,
      authorId: currentUser.userId,
    });
  }

  @Mutation(() => PostResponse)
  async setPublished(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
