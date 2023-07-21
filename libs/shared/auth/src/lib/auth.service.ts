import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  private token = '';
  credentials = {username: '', password: ''};
  constructor(private http: HttpClient, private router: Router) { }

  /*login(): Observable<string> {
    return this.http.post<string>('https://fakestoreapi.com/auth/login', {
      username: 'david_r',
      password: '3478*#54'
    }).pipe(tap(token => this.token = token));
  }*/

  login(username:string, password:string){
    this.credentials.username = username;
    this.credentials.password = password;
    this.authenticated=true;
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticated=true;
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.authenticated; }

  getCredentials() {
    return this.credentials;
  }

}