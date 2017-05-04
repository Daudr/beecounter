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
    return this.http.post('api/connect', user, {headers: headers}).map(res => res.json());
  }

  query (): Promise<any[]> {
    return this.http.get('api/query')
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  singolaDataTabella (data: string): Promise<any[]> {
    return this.http.get('api/query/' + data)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  intervalloDateTabella (datada: string, dataa: string): Promise<any[]> {
    return this.http.get('api/query/' + datada + '/' + dataa)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  arniaTabella (arnia: number) {
    return this.http.get('api/arniat/' + arnia)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  sensoreTabella (sensore: number) {
    return this.http.get('api/arniat/' + sensore)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  graph (): Promise<any[]> {
    return this.http.get('api/graph')
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  close () {
    return this.http.post('api/close', this).map(res => res.json());
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
  }
}
