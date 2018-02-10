import { Component, OnInit } from '@angular/core';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayName;
  photoURL;
  error;

  constructor(private af: AngularFire, private http: Http) {
  }


  ngOnInit() {
    this.af.auth.subscribe(authState => { 
    //  authState.uid  usert el lehet kérni
    });
  }

  register() {
    this.af.auth.createUser({
      email: 'vmi@gmail.com',
      password: '1234'
    })
      .then(authState => authState.auth.sendEmailVerification())
      .catch(error => console.log("REGISTER-ERROR", error));
  }

  login() {
    this.af.auth.login({
      email: 'vmi@gmail.com',
      password: '1234'
    }, {
        method: AuthMethods.Password,
        provider: AuthMethods.Password
      }).
      then(authState => console.log("LOGIN_THEN", authState))
      .catch(error => this.error = error.message);
  }


  logout() {
    this.af.logout();
  }


}
