import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
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
  private isMock = false;
  private url = 'http://localhost:30024';
  loginSubject: Subject<unknown> = new Subject<unknown>();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username:string, password:string){
    this.credentials.username = username;
    this.credentials.password = password;
    this.authenticated=true;
    if(!this.isMock){
      this.retrieveToken();
    }
    this.loginSubject.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticated=false;
    this.token = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.authenticated; }

  getLoginSubject() {
    return this.loginSubject;
  }

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
       
      this.http.post(this.url+'/realms/myfinance/protocol/openid-connect/token', 
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
    console.log('token expires in:'+ token.expires_in);
  }

  getToken() : string {
    if(this.expireDate < new Date().getTime()){
      this.logout()
    } 
    return this.token;
  }

  setOpenIdServiceUrl(url: string): void {
    this.url = url;
  }

}