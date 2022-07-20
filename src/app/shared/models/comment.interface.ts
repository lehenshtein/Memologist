import { ID } from '@datorama/akita';
import { marks } from '@shared/models/post.interface';

export interface CommentInterface {
  author: any,
  createdAt: Date,
  marked: marks,
  post: ID,
  score: number,
  text: string,
  updatedAt: Date,
}
