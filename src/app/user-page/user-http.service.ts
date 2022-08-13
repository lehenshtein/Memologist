import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInterface } from '@shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { PostInterfaceGet } from '@shared/models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  getUserByName (name: string): Observable<UserInterface | null> {
      return this.http.get<UserInterface>(`/user/${name}`);
  }

  getUserPosts(name: string): Observable<PostInterfaceGet[]> {
    return this.http.get<PostInterfaceGet[]>(`/posts/user/${name}`);
  }
}
