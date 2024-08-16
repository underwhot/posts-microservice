export interface CreatePostRequest {
  messate: string;
  title: string;
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
