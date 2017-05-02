import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  results: any[];

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
			});
  }

  query () {
    this.results = null;
    this.db
			.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens")
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});
        console.log(this.results);
			});
  }

}
