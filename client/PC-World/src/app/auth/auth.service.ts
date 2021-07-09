import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(userData: { email: string, password: string }): Observable<Object> {
    return this.http.post(environment.api_url + 'user/login', userData, { withCredentials: true });
  }

  register(userData: { email: string, password: string }): Observable<Object> {
    return this.http.post(environment.api_url + 'user/register', userData, { withCredentials: true });
  }
}