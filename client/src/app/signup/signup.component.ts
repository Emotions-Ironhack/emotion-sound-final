import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string;
  username:string;
  password:string;
  email:string;

  constructor(public router: Router, private session: SessionService) { }

  ngOnInit() {}

  signup() {
    this.session.signup(this.username, this.password, this.email)
      .subscribe(
        (user) => {
          console.log(user);
          this.router.navigate(['/user/login']);
        },
        (err) => this.error = err
      );
  }

}
