import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public results: any[];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:any[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  public barChartDataIn: any[] = [];
  public barChartDataOut: any[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db
			.graph()
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});

        for (var i=0;i<this.results.length;i++) {
          this.barChartLabels.push(this.results[i].data);

          this.barChartDataIn.push(this.results[i].in);
          this.barChartDataOut.push(this.results[i].out);
        }

        this.barChartData = [
          {data: this.barChartDataIn, label: 'Entrate'},
          {data: this.barChartDataOut, label: 'Uscite'}
        ];

        console.log('lbl: ' + this.barChartLabels + '\nin: ' + this.barChartDataIn + '\nout: ' + this.barChartDataOut);
        console.log(this.results);
			});
  }

}
