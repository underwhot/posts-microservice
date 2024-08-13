import { IPost } from './post.interface';
import { PostServices } from './services';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  isUUID,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@lib/errors';
import { randomUUID } from 'crypto';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = randomUUID();

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished = false;

  @IsString()
  updatedAt = new Date().toISOString();

  @IsString()
  createdAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();

    // if (post?.id && !isUUID(post.id)) {
    //   throw new DomainError([], 'Invalid UUID for id');
    // }
    // if (post?.authorId && !isUUID(post.authorId)) {
    //   throw new DomainError([], 'Invalid UUID for authorId');
    // }

    Object.assign(_post, post);
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;
    const errors = validateSync(_post, { whitelist: true });
    if (errors.length > 0) {
      throw new DomainError(errors, 'Post validation failed');
    }
    return _post;
  }
}
