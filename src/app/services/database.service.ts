import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  connect (user, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/connect', user, {headers: headers}).map(res => res.json());
  }

  query (query) {
    return this.http.get('http://localhost:8080/api/query', query).map(res => res.json());
  }

  close () {
    return this.http.post('http://localhost:8080/api/close', this).map(res => res.json());
  }
}
