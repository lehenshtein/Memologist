import { UserPostInterface } from '@shared/models/user.interface';
import { ID } from '@datorama/akita';

export interface PostInterfaceToSend {
  title: string,
  text: string,
  tags: string[],
  imgUrl: string,
  author: string
}

export interface PostInterfaceGet extends Omit<PostInterfaceToSend, 'author'> {
  author: UserPostInterface,
  createdAt: string,
  updatedAt: string,
  _id: ID
}
