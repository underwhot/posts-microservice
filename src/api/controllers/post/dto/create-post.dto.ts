import { CreatePostDto as ICreatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty({ description: 'Post title', type: 'string' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Post content', type: 'string' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  authorId: string;
}
