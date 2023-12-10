import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserModel } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();
  private authenticated: boolean = false;
  private logoutUrl = 'http://127.0.0.1:8000/logout';
  user!:UserModel;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/login', credentials, {
      withCredentials: true}).pipe(
      tap((response)=>{
        const token = response.jwt;
        console.log('token aqui',token)
        localStorage.setItem('jwt',token);
        this.user = this.getUser(token)
      })
    );
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
  
  getUser(token: string): UserModel{
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }
}
