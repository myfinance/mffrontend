import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
