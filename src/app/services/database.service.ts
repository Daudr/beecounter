import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  connect (user, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/connect', user, {headers: headers}).map(res => res.json());
  }

  query (query): Promise<any[]> {
    return this.http.post('http://localhost:8080/api/query', query)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  close () {
    return this.http.post('http://localhost:8080/api/close', this).map(res => res.json());
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
  }
}
