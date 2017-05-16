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
  public results: any[];                // array che contiene i risultati forniti dal database

  public arrayDate: Date[] = [];        // array che contiene le date fornite dal database
  public arrayArnie: number[] = [];     // array che contiente le arnie fornite dal database
  public arraySensore: number[] = [];   // array che contiene i sensori forniti dal database

  public minDate: string;               // prima data all'interno del database
  public maxDate: string;               // ultima data all'interno del database

  public minArnia: number;              // numero della prima arnia
  public maxArnia: number;              // numero dell'ultima arnia

  public minSensore: number;            // numero del primo sensore
  public maxSensore: number;            // numero dell'ultimo sensore

  // Attributi utili per le opzioni
  public radio: number = 1;

  public singolaData: string;

  public datada: string;
  public dataa: string;

  public arnia: number;

  public sensore: number;

  public i: number = 0;

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() { }

  /**
  * Permette di inviare la query appena la pagina viene aperta
  */
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
        this.arnia = this.minArnia;
        this.maxArnia = Math.max.apply(null, this.arrayArnie);

        this.minSensore = Math.min.apply(null, this.arraySensore);
        this.sensore = this.minSensore;
        this.maxSensore = Math.max.apply(null, this.arraySensore);
			});
  }

  /**
  * Permette di modificare la tabella secondo i criteri scelti
  */

  query () {
    this.results = null;
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
  }

  add () {
    if (this.i < this.results.length) this.i = this.i + 999;
  }

  decrease () {
    if (this.i > 0) this.i = this.i - 999;
  }
}
