import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { PostsStore, PostsState } from './posts.store';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { marks, PostInterfaceGet, sort } from '@shared/models/post.interface';
import { tap } from 'rxjs/operators';
import { CommentInterface } from '@shared/models/comment.interface';

@Injectable({providedIn: 'root'})
export class PostsService extends NgEntityService<PostsState> {
  constructor (protected store: PostsStore, private httpService: HttpClient) {
    super(store);
  }

  createPost(data: FormData) {
    return this.httpService.post(`/posts`, data)
  }

  getPostsPaginated(page: number, limit: number, sort: sort, search?: string): Observable<HttpResponse<PostInterfaceGet[]>> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('sort', sort)
      .set('search', search || '')
    return this.httpService.get<PostInterfaceGet[]>(`/posts`,{ params, observe: 'response' })
  }

  getUserPostsPaginated(page: number, limit: number, name: string, search?: string): Observable<HttpResponse<PostInterfaceGet[]>> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('sort', 'new')
      .set('search', search || '')
    return this.httpService.get<PostInterfaceGet[]>(`/posts/user/${name}`,{ params, observe: 'response' })
  }

  changeScore (id: ID, markType: marks): Observable<PostInterfaceGet> {
    return this.httpService.post<PostInterfaceGet>(`/posts/mark`, {id, markType}).pipe(
      tap((res: PostInterfaceGet) => {
        // this.store.update(id, {score: res.score, marked: markType});
      }));
  }

  changeCommentScore (id: ID, markType: marks): Observable<CommentInterface> {
    return this.httpService.post<CommentInterface>(`/comment/mark`, {id, markType}).pipe(
      tap((res: CommentInterface) => {
        // this.store.update(id, {score: res.score, marked: markType});
      }));
  }

  sendComment(postId: ID, commentText: string): Observable<CommentInterface> {
    const body = {
      post: postId,
      text: commentText
    }
    return this.httpService.post<CommentInterface>(`/comment`, body);
  }

  getCommentsForPost(postId: ID): Observable<CommentInterface[]> {
    return this.httpService.get<CommentInterface[]>(`/comment/${postId}`);
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
