import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInterfaceGet } from '@shared/models/post.interface';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getPosts(): Observable<PostInterfaceGet[]> {
    return this.http.get<PostInterfaceGet[]>(`${this.url}posts/get`);
  }
  getPost(id: PostInterfaceGet['_id']): Observable<PostInterfaceGet> {
    return this.http.get<PostInterfaceGet>(`${this.url}posts/get/${id}`);
  }
  deletePost(id: string): Observable<string> {
    return this.http.delete<string>(`${this.url}posts/delete/${id}`)
  }
}
