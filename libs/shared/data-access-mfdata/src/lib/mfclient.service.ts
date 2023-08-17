import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instrument } from './model/instrument';
import { AuthService } from 'libs/shared/auth/src/lib/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MfClientService {

  private url = 'http://localhost:7009';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTenants(): Observable<Instrument[]> {

    //return this.http.get<Instrument[]>(`${this.url}/tenants`, {headers: this.buildHeader()})
    return this.http.get<Instrument[]>(`${this.url}/tenants`)
  }

  saveTenant(instrument:Instrument): Observable<string> {
    const body=JSON.stringify(instrument);
    console.log("body:"+body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers: headers };
    return this.http.post<string>(`${this.url}/saveinstrument`, body, options);
  }

  setMfClientUrl(url: string): void {
    this.url = url;
  }

  buildHeader() {
    const credentials = this.auth.getCredentials();
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : { });
    return headers 
  }

  /*retrieveToken(code) {
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
      this._http.post('http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token', 
        params.toString(), { headers: headers })
        .subscribe(
          data => this.saveToken(data),
          err => alert('Invalid Credentials')); 
  }*/
}
