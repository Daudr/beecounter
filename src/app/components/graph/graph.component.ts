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
  public barChartLabels:any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public barChartDataIn: any[] = [];
  public barChartDataOut: any[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db
			.graph(/*"SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens"*/)
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});

        this.barChartLabels = [];
        this.barChartData = [];

        for (var i=0;i<this.results.length;i++) {
          this.barChartLabels.push(this.results[i].data);

          this.barChartDataIn.push(this.results[i].in);
          this.barChartDataOut.push(this.results[i].out);
        }

        this.barChartData = [
          {data: this.barChartDataIn, label: 'Entrate'},
          {data: this.barChartDataOut, label: 'Uscite'}
        ];
			});
  }

}
