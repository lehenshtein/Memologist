import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PostInterfaceToSend } from '@shared/models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class LayoutTestService {

  constructor(private http: HttpClient) {
  }

  getTestData(): Observable<any[]> {
    return this.http.get<any[]>('https://memologist-be.herokuapp.com/posts/get');
  }
  getTestDataFromMyServer(): Observable<any> {
    return this.http.get<any>('https://memologist-be.herokuapp.com/authors/get');
  }
  createPost(post: PostInterfaceToSend): Observable<PostInterfaceToSend> {
    return this.http.post<PostInterfaceToSend>('https://memologist-be.herokuapp.com/posts/create', post);
  }
}
