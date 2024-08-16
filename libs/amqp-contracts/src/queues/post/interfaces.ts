export interface CreatePostRequest {
  message: string;
  title: string;
  authorId: string;
}

export interface CreatePostResponse {
  id: string;
  title: string;
  message: string;
  authorId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
