import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommandHandler } from './create-post/create-post.command-handler';
import { UpdatePostCommandHandler } from './update-post/update-post.command-handler';
import { DeletePostCommandHandler } from './delete-post/delete-post.command-handler';
import { SetPublishedCommandHandler } from './set-published/set-published.command-handler';

// commands
export * from './create-post/create-post.command';
export * from './delete-post/delete-post.command';
export * from './update-post/update-post.command';
export * from './set-published/set-published.command';

// command handlers
export * from './create-post/create-post.command-handler';
export * from './delete-post/delete-post.command-handler';
export * from './update-post/update-post.command-handler';
export * from './set-published/set-published.command-handler';

export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreatePostCommandHandler,
  UpdatePostCommandHandler,
  DeletePostCommandHandler,
  SetPublishedCommandHandler,
];
