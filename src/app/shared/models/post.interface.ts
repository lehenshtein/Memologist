import { UserPostInterface } from '@shared/models/user.interface';

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
  _id: string
}
