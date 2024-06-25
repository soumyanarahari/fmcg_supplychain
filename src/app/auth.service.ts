import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserSubscriptions } from "src/models/user-subscriptions.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    password: string;
    email: string;
    userType:string
  }): Observable<any> {
    return this.http.post("/api/register", user);
  }

  login(user: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/login", user);
  }
  getCurrentUsername(): Observable<string> {
    const token = localStorage.getItem("token");

    if (token) {
      // If you're using a token-based system, send the token to the server to get user details
      return this.http.get<string>("/api/get-username", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // Handle the case where there's no token or return a default username
      return new Observable<string>((observer) => {
        observer.next("Guest"); // Replace 'Guest' with your default username
        observer.complete();
      });
    }
  }
  getUserId(): Observable<string | null> {
    const token = localStorage.getItem("token");

    if (token) {
      // If you're using a token-based system, you may need to send the token to the server to get user details
      return this.http.get<string>("/api/get-user-id", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // Handle the case where there's no token or return null for no authenticated user
      return new Observable<string | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }
  // upgradeSubscription(): Observable<any> {
  //   // Make a POST request to the backend API endpoint for subscription plan upgrade
  //   return this.http.post(`${this.apiUrl}/upgrade-subscription`, {});
  // }

  getCurrentSubscriptionPlan(type: string): Observable<string> {
    const token = localStorage.getItem("token");

    if (token) {
      // If you're using a token-based system, send the token to the server to get the subscription plan
      return this.http.get<string>(
        `/api/get-current-subscription-plan/${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      // Handle the case where there's no token or return a default subscription plan
      return new Observable<string>((observer) => {
        observer.next("basic"); // Replace 'basic' with your default subscription plan
        observer.complete();
      });
    }
  }
  upgradeSubscription(type: string): Observable<any> {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Ensure token is present
    if (!token) {
      console.error("Token is missing. Unable to upgrade subscription.");
      // You might want to handle this case appropriately, e.g., redirect to login
      return throwError("Token is missing");
    }

    // Set up the request headers with the Authorization header
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    // Make a POST request to the backend API endpoint for subscription plan upgrade
    return this.http.post(`/api/upgrade-subscription/${type}`, {}, { headers });
  }

  getUserSubscriptions(): Observable<UserSubscriptions> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError('Token is missing');
    }
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.post<UserSubscriptions>(`/api/userSubscriptions`,{}, { headers });
  }

  createAdvtCustomerPortalSession() : Observable<string> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError(() => new Error('Token is missing'));
    }

    return this.http.post('/api/createAdvertiserCustomerPortalSession', {}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  createEventCustomerPortalSession() : Observable<string> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError(() => new Error('Token is missing'));
    }

    return this.http.post('/api/createEventCustomerPortalSession', {}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  createJobCustomerPortalSession() : Observable<string> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError(() => new Error('Token is missing'));
    }

    return this.http.post('/api/createJobCustomerPortalSession', {}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  createManufacturerCustomerPortalSession() : Observable<string> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token is missing. Unable to upgrade subscription.');
      return throwError(() => new Error('Token is missing'));
    }

    return this.http.post('/api/createManufacturerCustomerPortalSession', {}, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }
}
