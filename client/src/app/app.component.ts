import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: any;
  constructor(public router: Router, public session:SessionService){ }

  ngOnInit() {
    this.session.isLoggedIn().subscribe( user => {
      return this.user = user;
    });
  }
  logout(){
    this.session.logout().subscribe();
    this.router.navigate(['/']);
  }
}
