
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map , catchError} from 'rxjs/operators';


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
    return this.http.put(`/api/update-manufacturer-profile`, m_profile_data, { headers });
  }
  updateBrandProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.put(`/api/update-brand-profile`, m_profile_data, { headers });
  }
  updateServiceproviderProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.put(`/api/update-serviceprovider-profile`, m_profile_data, { headers });
  }
  updateDistributorProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.put(`/api/update-distributor-profile`, m_profile_data, { headers });
  }
  createManufacturerProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-manufacturer-profile`, m_profile_data, { headers });
  }

  createBrandProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-brand-profile`, m_profile_data, { headers });
  }
  createServiceproviderProfile
  (m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-serviceprovider-profile`, m_profile_data, { headers });
  }
  createDistributorProfile(m_profile_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-serviceprovider-profile`, m_profile_data, { headers });
  }
 
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
  
  getManufacturers(productCategory: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return this.http.get<any[]>(`/api/manufacturersList/${productCategory}`);
    

  }
  getCompanies(productCategory: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return this.http.get<any[]>(`/api/companiesList/${productCategory}`);
  }
  getCompanyById(companyId: string): Observable<any> {
    
    return this.http.get<any[]>(`/api/companyById/${companyId}`);
  }

  getProductCategoriesListByCompanyId(companyId: string): Observable<any> {
    return this.http.get<any[]>(`/api/product-category-list/${companyId}`);
  }
  getClientsListByCompanyId(companyId: string): Observable<any> {
    return this.http.get<any[]>(`/api/client-list/${companyId}`);
  }
  getCertificatesListByCompanyId(companyId: string): Observable<any> {
    return this.http.get<any[]>(`/api/certificate-list/${companyId}`);
  }
  getPocByCompanyId(companyId: string): Observable<any> {
    return this.http.get<any[]>(`/api/poc-list/${companyId}`);
  }
  createAd(ad_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/create-ad`, ad_data, { headers });
  }
}
