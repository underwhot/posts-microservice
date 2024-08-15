import { Paginated } from '@lib/shared';
import { ObjectType } from '@nestjs/graphql';
import { PostResponse } from './post.response';

@ObjectType()
export class PaginatedPosts extends Paginated(PostResponse) {}
