import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Observable } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsQuery extends QueryEntity<PostsState> {

  constructor (protected store: PostsStore) {
    super(store);
  }

  getPosts(): Observable<PostInterfaceGet[]> {
    return this.selectAll();
  }
}
