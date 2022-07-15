import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`http://localhost:3000/auth/register`, data);
  }
}
