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

  public radio: number = 3;

  public arrayDate: Date[] = [];
  public arrayArnie: number[] = [];
  public arraySensore: number[] = [];

  public minDate: string;
  public maxDate: string;

  public minArnia: number;
  public maxArnia: number;

  public minSensore: number;
  public maxSensore: number;

  public singolaData: string;

  public datada: string;
  public dataa: string;

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

    $('.datepicker').datetimepicker();
  }

  query () {
    // this.results = null;
    if (this.radio == 1) {    // Singola Data
      this.db
  			.singolaDataTabella(this.singolaData)
  			.then((results: any[]) => {
  				this.results = results.map((results) => {
  					return results;
  				});
  			});
    } else if (this.radio == 2) {   // Intervallo date
      this.db
        .intervalloDateTabella(this.datada, this.dataa)
        .then((results: any[]) => {
          this.results = results.map((results) => {
            return results;
          });
        });
    } else if (this.radio == 3) {   // Sensore
      this.db
        .arniaTabella(this.arnia)
        .then((results: any[]) => {
          this.results = results.map((results) => {
            return results;
          });
        });

    } else {                    // Arnia
      this.db
        .sensoreTabella(this.sensore)
        .then((results: any[]) => {
          this.results = results.map((results) => {
            return results;
          });
        });
    }

    console.log(this.radio);
  }
}
