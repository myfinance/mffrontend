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

  login(username:string, password:string){
    this.credentials.username = username;
    this.credentials.password = password;
    this.authenticated=true;
    this.retrieveToken();
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticated=false;
    this.token = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.authenticated; }

  getCredentials() {
    return this.credentials;
  }

  private retrieveToken() {
    let params = new URLSearchParams();   
    params.append('grant_type','password');
    params.append('client_id', this.clientId);
    params.append('username', this.credentials.username);
    params.append('password', this.credentials.password);

    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
      this.http.post('http://localhost:30024/realms/myfinance/protocol/openid-connect/token', 
        params.toString(), { headers: headers })
        .subscribe({
          next:
            data => this.saveToken(data),
          error: 
            (e) => {
              console.error(e);
              alert('Invalid Credentials');
            }
        });
  }

  private saveToken(token: any) {
    this.expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.token = token.access_token;
    console.log('Obtained Access token:'+this.token);
  }

  getToken() : string {
    if(this.expireDate < new Date().getTime()){
      this.logout()
    } 
    return this.token;
  }

}