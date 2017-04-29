import { Component, OnDestroy } from '@angular/core';

import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor (private db: DatabaseService) { }
  ngOnDestroy () {
    this.db.close();
  }
}
