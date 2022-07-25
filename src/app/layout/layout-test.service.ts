import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PostInterfaceToSend } from '@shared/models/post.interface';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutTestService {

  constructor(private http: HttpClient) {
  }

  getTestData(): Observable<any[]> {
    return this.http.get<any[]>('https://memologist-be.herokuapp.com/posts/get');
  }
  createPost(post: PostInterfaceToSend): Observable<PostInterfaceToSend> {
    return this.http.post<PostInterfaceToSend>(`/posts`, post);
  }
}
