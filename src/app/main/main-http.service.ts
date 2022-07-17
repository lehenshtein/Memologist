import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {

  constructor(private http: HttpClient) { }
  // getPosts(): Observable<PostInterfaceGet[]> {
  //   return this.http.get<PostInterfaceGet[]>(`${this.url}posts/get`);
  // }
  // getPost(id: PostInterfaceGet['_id']): Observable<PostInterfaceGet> {
  //   return this.http.get<PostInterfaceGet>(`${this.url}posts/${id}`);
  // }
  deletePost(id: ID): Observable<string> {
    return this.http.delete<string>(`/posts/${id}`)
  }
}
