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

  getVersion(): Observable<string> {

    //return this.http.get<string>(`${this.url}/mf/index`, {headers: this.buildHeader()})
    return this.http.get<string>(`${this.url}/mf/index`)
  }

  getTenants(): Observable<Instrument[]> {

    return this.http.get<Instrument[]>(`${this.url}/mf/tenants`, {headers: this.buildHeader()})
    //return this.http.get<Instrument[]>(`${this.url}/mf/tenants`)
  }

  saveTenant(instrument:Instrument): Observable<string> {
    const body=JSON.stringify(instrument);
    console.log("body:"+body);

    //const headers = new HttpHeaders({
    //  'Content-Type': 'application/json'});
    //const options = { headers: headers };
    const options = { headers: this.buildHeader() };
    return this.http.post<string>(`${this.url}/saveinstrument`, body, options);
  }

  setMfClientUrl(url: string): void {
    this.url = url;
  }

  buildHeader() {
    const headers = new HttpHeaders({
      //'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
      //'Content-Type': 'application/json',
      //'Origin': 'http://localhost:4200',
      //'Accept': 'application/json',
      //'Access-Control-Allow-Origin': '/',
      'Authorization': 'Bearer '+ this.auth.getToken()});
      console.log(headers);
    return headers;
  }
}


