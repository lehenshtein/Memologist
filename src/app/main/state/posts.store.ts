import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PostInterfaceGet } from '@shared/models/post.interface';

export interface PostsState extends EntityState<PostInterfaceGet>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts', idKey: '_id' })
export class PostsStore extends EntityStore<PostsState> {

  constructor() {
    super();
  }

}
