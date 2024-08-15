import { UpdatePostDto as IUpdatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdatePostDto implements IUpdatePostDto {
  @ApiProperty({
    description: 'Post id',
    type: 'string',
    example: randomUUID(),
  })
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string;

  @ApiPropertyOptional({ description: 'Post title', type: 'string' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Post message', type: 'string' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  message?: string;
}
