import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  private token= '';
  private expireDate = new Date().getTime();
  clientId = "mfclient";
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
    this.retrieveToken();
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

  retrieveToken() {
    let params = new URLSearchParams();   
    params.append('grant_type','password');
    params.append('client_id', this.clientId);
    params.append('username', this.credentials.username);
    params.append('password', this.credentials.password);

    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
      this.http.post('http://localhost:30024/realms/myfinance/protocol/openid-connect/token', 
        params.toString(), { headers: headers })
        .subscribe(
          data => this.saveToken(data),
          err => alert('Invalid Credentials')); 
  }

  saveToken(token: any) {
    this.expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.token = token.access_token;
    console.log('Obtained Access token:'+this.token);
  }

}