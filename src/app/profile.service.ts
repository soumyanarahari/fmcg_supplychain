
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
//   private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateManufacturerProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/update-manufacturer-profile`, m_profile_data, { headers });
  }
 
  createManufacturerProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-manufacturer-profile`, m_profile_data, { headers });
  }
  // isManufacturerProfileCreated(): Observable<boolean> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
  //   // Set the content type to JSON in the headers
  //   headers.set('Content-Type', 'application/json');

  //   // Assuming you have an API endpoint to check the existence of the profile
  //   return this.http.get<boolean>(`${this.apiUrl}/check-manufacturer-profile`, { headers }).pipe(map(response => response.exists));;
  // }
  isManufacturerProfileCreated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    
    // Create HttpHeaders object and set Authorization header
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers = headers.set('Content-Type', 'application/json');
  
    // Assuming you have an API endpoint to check the existence of the profile
    return this.http.get<{ exists: boolean }>(`/api/check-manufacturer-profile`, { headers }).pipe(
      map(response => response.exists)
    );
  }
  
  
  getManufacturerProfileDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-manufacturerProfileDetails`, { headers });
  }
}
