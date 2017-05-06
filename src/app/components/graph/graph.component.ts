import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public results: any[];
  public graphLoaded:boolean = false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:any[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  public singolaData: string;

  public dataa: string;
  public datada: string;

  public arrayDate: Date[] = [];
  public minDate: string;
  public maxDate: string;

  public radio: number = 1;

  constructor(
    private db: DatabaseService
  ) { }

  /**
  * Permette di inviare la query appena la pagina viene aperta
  */
  ngOnInit() {
    this.db
			.graph()
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});

        for (let i = 0; i < this.results.length; i++) {
            this.arrayDate.push(this.results[i].data);
        }

        this.minDate = new DatePipe('it-IT').transform(this.arrayDate[0], 'yyyy-MM-dd');
        this.maxDate = new DatePipe('it-IT').transform(this.arrayDate[this.arrayDate.length-1], 'yyyy-MM-dd');

        var barChartDataIn = [];
        var barChartDataOut = [];

        for (var i=0;i<this.results.length;i++) {
          this.barChartLabels.push(new DatePipe('it-IT').transform(this.results[i].data, 'dd/MM/yyyy'));

          barChartDataIn.push(this.results[i].in);
          barChartDataOut.push(this.results[i].out);
        }

        this.barChartData = [
          {data: barChartDataIn, label: 'Entrate'},
          {data: barChartDataOut, label: 'Uscite'}
        ];

        this.graphLoaded = true;
			});
  }

  /**
  * Permette di modificare il grafico secondo i criteri scelti
  *
  * !! IN SVILUPPO !!
  */

  query () {
    this.graphLoaded = false;
    if (this.radio == 1) {    // Singola Data
      this.db
  			.singolaDataGrafico(this.singolaData)
  			.then((results: any[]) => {
  				this.results = results.map((results) => {
  					return results;
  				});

          this.barChartLabels = [];
          var barChartDataIn = [];
          var barChartDataOut = [];

          for (var i=0;i<this.results.length;i++) {
            this.barChartLabels.push(new DatePipe('it-IT').transform(this.results[i].data, 'dd/MM/yyyy'));

            barChartDataIn.push(this.results[i].in);
            barChartDataOut.push(this.results[i].out);
          }

          this.barChartData = [
            {data: barChartDataIn, label: 'Entrate'},
            {data: barChartDataOut, label: 'Uscite'}
          ];

          this.graphLoaded = true;
  			});
    } else if (this.radio == 2) {   // Intervallo date
      this.db
        .intervalloDateGrafico(this.datada, this.dataa)
        .then((results: any[]) => {
          this.results = results.map((results) => {
            return results;
          });

          this.barChartLabels = [];
          var barChartDataIn = [];
          var barChartDataOut = [];

          for (var i=0;i<this.results.length;i++) {
            this.barChartLabels.push(new DatePipe('it-IT').transform(this.results[i].data, 'dd/MM/yyyy'));

            barChartDataIn.push(this.results[i].in);
            barChartDataOut.push(this.results[i].out);
          }

          this.barChartData = [
            {data: barChartDataIn, label: 'Entrate'},
            {data: barChartDataOut, label: 'Uscite'}
          ];

          this.graphLoaded = true;
        });
    }
  }

}
