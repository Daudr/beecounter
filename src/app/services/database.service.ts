import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  // Se si lavora in locale bisogna togliere il commento dalle righe con localhost e aggiungerlo a quelle senza


  query (): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/query')
    return this.http.get('api/query')
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  singolaDataTabella (data: string): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/query/' + data)
    return this.http.get('api/query/' + data)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  intervalloDateTabella (datada: string, dataa: string): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/query/' + datada + '/' + dataa)
    return this.http.get('api/query/' + datada + '/' + dataa)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  arniaTabella (arnia: number) {
    // return this.http.get('http://localhost:8080/api/arniat/' + arnia)
    return this.http.get('api/arniat/' + arnia)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  sensoreTabella (sensore: number) {
    // return this.http.get('http://localhost:8080/api/sensoret/' + sensore)
    return this.http.get('api/sensoret/' + sensore)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  graph (): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/graph')
    return this.http.get('api/graph')
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  singolaDataGrafico (data: string): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/graph/' + data)
    return this.http.get('api/graph/' + data)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  intervalloDateGrafico (datada: string, dataa: string): Promise<any[]> {
    // return this.http.get('http://localhost:8080/api/graph/' + datada + '/' + dataa)
    return this.http.get('api/graph/' + datada + '/' + dataa)
    .toPromise()
    .then(response => response.json() as any[])
    .catch(this.handleError);
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
  }
}
