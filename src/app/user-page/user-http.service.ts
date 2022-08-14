import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { UserInterface } from '@shared/models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  getUserByName (name: string): Observable<UserInterface | null> {
      return this.http.get<UserInterface>(`/user/${name}`);
  }
}
