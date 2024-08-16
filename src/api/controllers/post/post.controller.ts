import { PostFacade } from '@lib/post/application-services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponsePaginated, ResponseWithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponse } from './response';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({
    summary: 'Create post',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: user.userId,
    });
  }

  @ApiOperation({
    summary: 'Get post by id',
  })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @ApiOperation({
    summary: 'Get all posts',
  })
  @ApiOkResponsePaginated(PostResponse)
  @Public()
  @Get()
  async getAllPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);

    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @ApiOperation({
    summary: 'Update post',
  })
  @ApiOkResponse({ type: PostResponse })
  @Put()
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePostDto,
      authorId: user.userId,
    });
  }

  @ApiOperation({
    summary: 'Set post as published',
  })
  @ApiOkResponse({ type: PostResponse })
  @Patch(':id')
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @ApiOperation({
    summary: 'Delete post',
  })
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
