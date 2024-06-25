import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  initiateResetPassword(email: string): Observable<any> {
    // Implement the logic to send a request to the server for initiating the forgot password process
    return this.http.post('/api/forgot-password', { email });
  }
  resetPassword(token: string, password: string) {
    return this.http.post('/api/reset-password', { token, newPassword: password });
  }
}