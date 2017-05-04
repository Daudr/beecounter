import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DatabaseService } from '../../services/database.service';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  public results: any[];

  public arrayDate: Date[] = [];
  public arrayArnie: number[] = [];
  public arraySensore: number[] = [];

  public minDate: string;
  public maxDate: string;

  public minArnia: number;
  public maxArnia: number;

  public minSensore: number;
  public maxSensore: number;

  public singolaData: Date;

  public datada: Date;
  public dataa: Date;

  public arnia: number;

  public sensore: number;

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.db
			.query()
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});

        for (let i = 0; i < this.results.length; i++) {
            this.arrayDate.push(this.results[i].data);
            this.arrayArnie.push(this.results[i].id_box);
            this.arraySensore.push(this.results[i].id_sens);
        }

        this.minDate = new DatePipe('it-IT').transform(this.arrayDate[0], 'yyyy-MM-dd');
        this.maxDate = new DatePipe('it-IT').transform(this.arrayDate[this.arrayDate.length-1], 'yyyy-MM-dd');

        this.minArnia = Math.min.apply(null, this.arrayArnie);
        this.maxArnia = Math.max.apply(null, this.arrayArnie);

        this.minSensore = Math.min.apply(null, this.arraySensore);
        this.maxSensore = Math.max.apply(null, this.arraySensore);
			});

    $('.datepicker').datepicker();
  }

  query () {
    /*
    this.results = null;
    this.db
			.query()
			.then((results: any[]) => {
				this.results = results.map((results) => {
					return results;
				});
			});
    */
    console.log(this.minDate);
    console.log(this.maxDate);
  }

}
