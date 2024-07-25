import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MfconfigService } from './mfconfig.service';

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
  private url:string;
  loginSubject: Subject<unknown> = new Subject<unknown>();
  logoutSubject: Subject<unknown> = new Subject<unknown>();

  constructor(private http: HttpClient, private router: Router, private mfConfigService: MfconfigService) {
    this.url = 'http://localhost:30024';
    this.mfConfigService.configLoaded.subscribe({
      next:
        () => {
          this.loadConfig();
        },
      error: (e) => console.error(e)
    });
  }

  private loadConfig() {
    this.url= this.mfConfigService.getCurrentOpenIdUrl();

  }


  login(username:string, password:string){
    this.credentials.username = username;
    this.credentials.password = password;
    this.authenticated=true;
    if(!this.isMock){
      this.retrieveToken();
    }
  }

  logout() {
    this.authenticated=false;
    this.token = '';
    this.logoutSubject.next(true);
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return this.authenticated; }

  getLoginSubject() {
    return this.loginSubject;
  }

  getLogoutSubject() {
    return this.logoutSubject;
  }

  getCredentials() {
    return this.credentials;
  }

  private retrieveToken() {
    const params = new URLSearchParams();   
    params.append('grant_type','password');
    params.append('client_id', this.clientId);
    params.append('username', this.credentials.username);
    params.append('password', this.credentials.password);

    const headers = 
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
    const now = Date.now();
    this.expireDate = now + (1000 * token.expires_in);
    this.token = token.access_token;
    console.log('Obtained Access token:'+this.token);
    console.log('token expires in:'+ token.expires_in);
    this.loginSubject.next(true);
    this.router.navigate(['/']);
  }

  getToken() : string {
    if(this.token){
      const now = Date.now();
      if(this.expireDate < now){
        this.logout()
      } 
    }
    return this.token;
  }

  getTokenExpDate() : number {
    return this.expireDate;
  }
  
  setToken(token: string, expires: number) {
    if(token) {
      this.expireDate = expires;
      this.token = token;
      this.authenticated=true;
      this.loginSubject.next(true);
      this.router.navigate(['/']);
    }
  }


}