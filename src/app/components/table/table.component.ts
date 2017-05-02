import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  results: any[];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.db
			.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens")
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});
        console.log(this.results);
			});
  }

  query () {
    this.results = null;
    this.db
			.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter WHERE `data` BEETWEEN `2017-02-24` AND `2017-02-26` GROUP BY `data`, id_box, id_sens")
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});
        console.log(this.results);
			});
  }

}
