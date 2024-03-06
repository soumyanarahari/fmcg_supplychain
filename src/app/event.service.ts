
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EventSubscriptionsOffers } from 'src/models/event-subscriptions-offers.model';
import { CheckOutSessionModel } from 'src/models/checkout-session.model';
import { ManufacturerSubscriptionOffers } from 'src/models/manufacturer-subscription-offers.model';
import { JobSubscriptionsOffers } from 'src/models/job-subscription-offers.model';
import { AdvertisementSubscriptionsOffers } from 'src/models/advertisement-subscription-offers.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  createEvent(eventData: any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post('/api/create-event', eventData, { headers });
  }
  
  getMyEvents(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>('/api/my-events', { headers });
  }

  getAllEvents(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>('/api/all-events', { headers });
  }

  getEventSubscriptionPlans(): Observable<EventSubscriptionsOffers[]>{
    return this.http.get<EventSubscriptionsOffers[]>('api/eventSubscriptions');
  }

  eventCheckoutSession(checkoutDetails:CheckOutSessionModel): Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError('Token is missing');
    }

    return this.http.post('/api/createEventsCheckoutSession', {...checkoutDetails}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  getManufacturerSubscriptionPlans(): Observable<ManufacturerSubscriptionOffers[]> {
    return this.http.get<ManufacturerSubscriptionOffers[]>('api/manufacturerSubscriptions');
  }

  manufacturerCheckoutSession(checkoutDetails:CheckOutSessionModel): Observable<string>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError('Token is missing');
    }

    return this.http.post('/api/createManufacturersCheckoutSession', {...checkoutDetails}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  getJobSubscriptionPlans(): Observable<JobSubscriptionsOffers[]>{
    return this.http.get<JobSubscriptionsOffers[]>('api/jobSubscriptions');
  }

  jobCheckoutSession(checkoutDetails:CheckOutSessionModel): Observable<string>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError('Token is missing');
    }

    return this.http.post('/api/createJobsCheckoutSession', {...checkoutDetails}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  getAdvtSubscriptions(): Observable<AdvertisementSubscriptionsOffers[]> {
    return this.http.get<AdvertisementSubscriptionsOffers[]>(`/api/advertiserSubscriptions`);
  }

  advertisementCheckoutSession(checkoutDetails:CheckOutSessionModel) : Observable<string>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError('Token is missing');
    }
    
    return this.http.post('/api/createAdvertisersCheckoutSession', {...checkoutDetails}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
    
  }
  getEventDetails(event_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make a GET request to fetch user details based on userId
    return this.http.get(`/api/get-eventDetails/${event_id}`, { headers });
  }
  updateEvent(event_data:any): Observable<any>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Set the content type to JSON in the headers
    headers.set('Content-Type', 'application/json');

    // Send a POST request to the server, including userId in the request body
    return this.http.post(`/api/update-event`, event_data, { headers });
  }
}
