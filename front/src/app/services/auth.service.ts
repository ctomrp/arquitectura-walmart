import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();
  private authenticated: boolean = false;
  private logoutUrl = 'http://127.0.0.1:8000/logout';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/login', credentials, {
      withCredentials: true,
    });
  }

  register(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/register', user);
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {}, { withCredentials: true });
  }

  checkAuthentication(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/user', {
      withCredentials: true,
    });
  }

  setAuthenticated(status: boolean): void {
    this.authenticatedSubject.next(status);
  }

  isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
