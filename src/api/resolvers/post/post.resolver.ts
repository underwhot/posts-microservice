import { PostFacade } from '@lib/post/application-services';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Query(() => PostResponse, { name: 'getPostById' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }
}
