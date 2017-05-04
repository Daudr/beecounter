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

        var barChartDataIn = [];
        var barChartDataOut = [];

        for (var i=0;i<this.results.length;i++) {
          this.barChartLabels.push(new Date(this.results[i].data));

          barChartDataIn.push(this.results[i].in);
          barChartDataOut.push(this.results[i].out);
        }

        this.barChartData = [
          {data: barChartDataIn, label: 'Entrate'},
          {data: barChartDataOut, label: 'Uscite'}
        ];

        console.log(this.barChartLabels[0].getDate());
        console.log(barChartDataIn);
        console.log(barChartDataOut);
        console.log(this.results);
			});
  }

}
