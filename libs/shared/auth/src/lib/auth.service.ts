import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  private username = '';
  private password = '';
  constructor(private http: HttpClient, private router: Router) { }

  /*login(): Observable<string> {
    return this.http.post<string>('https://fakestoreapi.com/auth/login', {
      username: 'david_r',
      password: '3478*#54'
    }).pipe(tap(token => this.token = token));
  }*/

  login(username:string, password:string){
    this.username=username;
    this.password=password;
    this.token = username+password;
    this.router.navigate(['/']);
  }

  logout() {
    this.token = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.token !== ''; }
}