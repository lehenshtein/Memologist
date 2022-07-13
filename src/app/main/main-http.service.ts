import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {
  url = environment.testApiUrl;

  constructor(private http: HttpClient) { }
  // getPosts(): Observable<PostInterfaceGet[]> {
  //   return this.http.get<PostInterfaceGet[]>(`${this.url}posts/get`);
  // }
  // getPost(id: PostInterfaceGet['_id']): Observable<PostInterfaceGet> {
  //   return this.http.get<PostInterfaceGet>(`${this.url}posts/${id}`);
  // }
  deletePost(id: ID): Observable<string> {
    return this.http.delete<string>(`${this.url}/posts/${id}`)
  }
}
