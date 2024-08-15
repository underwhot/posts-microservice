import { IPost } from '@lib/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'Post id' })
  id: string;

  @Field({ description: 'Post title' })
  title: string;

  @Field({ description: 'Post message' })
  message: string;

  @Field({ description: 'Post author id' })
  authorId: string;

  @Field({ description: 'Post created at' })
  createdAt: string;

  @Field({ description: 'Post updated at' })
  updatedAt: string;
}
