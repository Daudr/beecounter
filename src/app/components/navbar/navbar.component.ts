import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit() {
  }

  chiudiConnessione () {
    this.db.close();
  }

}
