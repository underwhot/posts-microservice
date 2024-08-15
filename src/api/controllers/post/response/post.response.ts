import { IPost } from '@lib/post';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'Post id',
    type: 'string',
    example: randomUUID(),
  })
  id: string;

  @ApiProperty({
    description: 'Post title',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    description: 'Post message',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    description: 'Post author id',
    type: 'string',
    example: randomUUID(),
  })
  authorId: string;

  @ApiProperty({
    description: 'Post created at',
    type: 'string',
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Post updated at',
    type: 'string',
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
