import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { CommentInterface } from '@shared/models/comment.interface';

export interface PostsState extends EntityState<PostInterfaceGet>, ActiveState {
  postComments: CommentInterface[]
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts', idKey: '_id', resettable: true })
export class PostsStore extends EntityStore<PostsState> {

  constructor() {
    super();
    const defaults = (entity: PostInterfaceGet) => ({ postComments: [] });
    this.createUIStore().setInitialEntityState(defaults);
  }

}
