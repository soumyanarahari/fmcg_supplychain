
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>('/api/all-jobs');
  }

  

   
  getEventDetails(event_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-eventDetails/${event_id}`, { headers });
  }

  getJobDetails(job_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-jobDetails/${job_id}`, { headers });
  }
  
  getJobPosterDetails(job_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-jobPosterDetails//${job_id}`, { headers });
  }
  getCompanyByUserId(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-combanyByUserId`, { headers });
  }
  applyForJob(jobId: string, formData: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    formData.append('jobId', jobId);
    return this.http.post('/api/apply-job', formData , { headers });
  }

  getScreeningQuestionsByJobId(job_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-screening-questions/${job_id}`, { headers });
  }
  getcustomQuestionsByJobId(job_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-custom-questions/${job_id}`, { headers });
  }

  deleteJob(jobId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete(`/api/delete-job/${jobId}`, { headers });
  }

  createJob(jobData: any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post('/api/create-job', jobData, { headers });
  }
  
  getMyJobs(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>('/api/my-jobs', { headers });
  }
  updateJob(formData:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.put(`/api/update-job`, formData, { headers });
  }
}
