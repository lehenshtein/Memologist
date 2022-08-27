import { UserPostInterface } from '@shared/models/user.interface';
import { ID } from '@datorama/akita';
export type marks = 'liked' | 'disliked' | 'default';
export type sort = 'hot' | 'new' | 'best';
export type contentType = 'text' | 'imgUrl' | 'imgName';

export interface PostContentInterface {
  type: contentType,
  imgUrl?: string,
  text?: string,
  imgName?: string
}

export interface PostInterfaceToSend {
  title: string,
  text: string,
  tags: string[],
  imgUrl: string,
  content?: PostContentInterface[]
}

export interface PostInterfaceGet extends Omit<PostInterfaceToSend, 'author'> {
  author: UserPostInterface,
  createdAt: string,
  updatedAt: string,
  score: number,
  marked?: marks,
  commentsAmount: number,
  _id: ID
}
