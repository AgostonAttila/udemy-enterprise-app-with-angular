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


  constructor(private af: AngularFire, private http: Http) {
  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if (!authState) {
        this.displayName = null;
        this.photoURL = null;
        return;
      }
      let userRef = this.af.database.object('/user/') + authState.uid;
      userRef.subscribe(user => {
        let url = `https://graph.facebook.com/v2.8/${authState.facebook.uid}?fields=first_name,last_name&acces_token=${user.accesToken}`;

        this.http.get(url).subscribe(response => {
          let user = response.json();

          userRef.update({
            firstName: user.first_name,
            lastName: user.last_name,
          })
        })
      })


      this.displayName = authState.auth.displayName;
      this.photoURL = authState.auth.photoURL;

    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,  //Redirect mód is van
      scope: ['public_profile', 'user_friends']
    }).then((authState: any) => {
      this.af.database.object('/users/' + authState.uid).update({
        accesToken: authState.facebook.accesToken
      })
    });
  }


  logout() {
    this.af.auth.logout();
  }


}
