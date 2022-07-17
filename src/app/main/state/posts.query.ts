import { Injectable } from '@angular/core';
import { ID, QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Observable } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Injectable({providedIn: 'root'})
export class PostsQuery extends QueryEntity<PostsState> {

  constructor (protected store: PostsStore) {
    super(store);
  }
// all methods could be removed and using changed to default akita methods
  // this is for helping purposes
  getPosts$ (): Observable<PostInterfaceGet[]> {
    return this.selectAll();
  }

  get getPosts (): PostInterfaceGet[] {
    return this.getAll();
  }

  getPost(id: ID): PostInterfaceGet | undefined {
    return this.getEntity(id);
  }

}
