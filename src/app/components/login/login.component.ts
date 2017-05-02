import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin () {
    this.db.connect('ciao', 'ciao').subscribe(data => {
      if(data.success) {
        this.router.navigate(['table']);
      } else {
        console.log('wrong user/password');
      }
    });
  }
}
