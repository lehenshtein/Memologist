import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { PostsStore, PostsState } from './posts.store';
import { MainHttpService } from '@app/main/main-http.service';
import { PostsQuery } from '@app/main/state/posts.query';

@Injectable({ providedIn: 'root' })
export class PostsService extends NgEntityService<PostsState> {
  // url = environment.testApiUrl;
  constructor(protected store: PostsStore, private httpService: MainHttpService, private query: PostsQuery) {
    super(store);
  }
  // get<T>(): Observable<PostInterfaceGet[]> {
  //   return this.httpService.getPosts().pipe(tap(entities => {
  //     this.store.set(entities);
  //   }));
  // }
  // getPost$(id: PostInterfaceGet['_id']): Observable<PostInterfaceGet> {
  //   return this.http.get<PostInterfaceGet>(`${this.url}posts/${id}`);
  // }
  // getPost(id: ID) {
  //   return this.query.selectEntity(id).pipe(
  //     switchMap((post: PostInterfaceGet | undefined) => {
  //       if (post) {
  //         return this.query.selectEntity(id)
  //       }
  //       return this.getPost$(id).pipe(
  //         catchError((err: HttpErrorResponse) => {
  //           return throwError(() => err);
  //         })
  //       );
  //     })
  //   )
  // }
}
