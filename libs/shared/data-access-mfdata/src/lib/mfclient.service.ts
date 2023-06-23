import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instrument } from './model/instrument';

@Injectable({
  providedIn: 'root'
})
export class MfClientService {

  private url = 'http://localhost:7009';

  constructor(private http: HttpClient) { }

  getTenants(): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(`${this.url}/tenants`)
  }

  addTenant(instrument:Instrument): Observable<string> {
    const body=JSON.stringify(instrument);
    console.log("body:"+body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers: headers };
    return this.http.post<string>(`${this.url}/addinstrument`, body, options);
  }

  setMfClientUrl(url: string): void {
    this.url = url;
  }
}
