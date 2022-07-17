import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { PostsStore, PostsState } from './posts.store';
import { PostsQuery } from '@app/main/state/posts.query';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { marks, PostInterfaceGet } from '@shared/models/post.interface';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService extends NgEntityService<PostsState> {
  constructor (protected store: PostsStore, private httpService: HttpClient, private query: PostsQuery) {
    super(store);
  }

  changeScore (id: ID, markType: marks): Observable<PostInterfaceGet> {
    return this.httpService.post<PostInterfaceGet>(`/posts/mark`, {id, markType}).pipe(
      tap((res: PostInterfaceGet) => {
        this.store.update(id, {score: res.score, marked: markType});
      }));
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
