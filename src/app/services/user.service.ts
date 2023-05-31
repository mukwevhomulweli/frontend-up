import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../types/UserLogin';
import { userUrl } from '../environments';
import { Observable } from 'rxjs';
import { UserOTP } from '../types/UserOTP';
import { Email } from '../types/email';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signInUser(user: UserLogin): Observable<UserOTP> {
    return this.http.post<UserOTP>(`${userUrl}/sign`, user);
  }
  resendOTP(email: any): Observable<UserOTP> {
    return this.http.post<UserOTP>(`${userUrl}/resend`, email);
  }
}
