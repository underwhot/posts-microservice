import { CreatePostDto } from '../dto/create-post.dto';

export class CreatePostCommand {
  constructor(public readonly post: CreatePostDto) {}
}
