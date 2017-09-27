import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Balance } from '../models/balance';

@Injectable()
export class BalancesService {
  private baseUrlAuth = '/api/v1';
  private baseUrl = '/api';

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrlAuth + '/balance')
      .map(res => res.json().data);
  }
}
