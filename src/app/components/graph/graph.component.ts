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
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartDataIn: any[] = [];
  public barChartDataOut: any[] = [];

  public barChartData:any[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db
			.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens")
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});
        console.log(this.results);

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

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
