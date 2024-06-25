import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private apiUrl = 'http://localhost:3000'; // Update with your Node.js backend URL

  constructor(private http: HttpClient) {}

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post('/api/login', user);
  }
}