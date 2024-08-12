import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto, UpdatePostDto } from './commands/dto';
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePosCommandtHandler,
  DeletePostCommand,
  SetPublishedCommand,
  SetPublishedCommandHandler,
  UpdatePostCommand,
  UpdatePostCommandHandler,
} from './commands';
import { GetPostQuery } from './queries/get-post/get-post.query';
import { PaginationDto } from '@lib/shared/dto';
import {
  GetPostQueryHandler,
  GetPostsQuery,
  GetPostsQueryHandler,
} from './queries';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    deletePost: (id: string) => this.deletePost(id),
    setPublished: (id: string) => this.setPublishedPost(id),
  };
  queries = {
    getOnePost: (id: string) => this.getPost(id),
    getAllPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  };
  events = {};

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand,
      CreatePostCommandHandler['execute']
    >(new CreatePostCommand(post));
  }

  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand,
      UpdatePostCommandHandler['execute']
    >(new UpdatePostCommand(post));
  }

  private setPublishedPost(id: string) {
    return this.commandBus.execute<
      SetPublishedCommand,
      SetPublishedCommandHandler['execute']
    >(new SetPublishedCommand(id));
  }

  private deletePost(id: string) {
    return this.queryBus.execute<
      DeletePostCommand,
      DeletePosCommandtHandler['execute']
    >(new DeletePostCommand(id));
  }

  private getPost(id: string) {
    return this.queryBus.execute<GetPostQuery, GetPostQueryHandler['execute']>(
      new GetPostQuery(id),
    );
  }

  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetPostsQuery,
      GetPostsQueryHandler['execute']
    >(new GetPostsQuery(pagination));
  }
}
