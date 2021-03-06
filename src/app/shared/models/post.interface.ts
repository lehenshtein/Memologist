import { UserPostInterface } from '@shared/models/user.interface';
import { ID } from '@datorama/akita';
export type marks = 'liked' | 'disliked' | 'default';

export interface PostInterfaceToSend {
  title: string,
  text: string,
  tags: string[],
  imgUrl: string
}

export interface PostInterfaceGet extends Omit<PostInterfaceToSend, 'author'> {
  author: UserPostInterface,
  createdAt: string,
  updatedAt: string,
  score: number,
  marked?: marks,
  _id: ID
}
