import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    // '/api/create-event'
    return this.http.get('/api/get-userDetails', { headers });
  }
  subscribeForNewsletter(emailInput: any): Observable<any>{
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log(`userservice ${emailInput}`)
  // Set the content type to JSON in the headers
  headers.set('Content-Type', 'application/json');
   // Send a POST request to the server, including userId in the request body
   return this.http.post('/api/subscribe-to-newsletter', {emailInput}, { headers });
  }
  
  

 

}
