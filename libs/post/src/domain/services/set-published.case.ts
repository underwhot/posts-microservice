import { IPost } from '../post.interface';

export interface ISetPublished {
  setPublished(): void;
}

export const SET_PUBLISHED = async function (this: IPost) {
  this.isPublished = true;
};
