import { Component } from '@angular/core';
import { Auth } from 'app/auth.service';

import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private auth: Auth, private authHttp: AuthHttp) { }

  showProfile() {
    console.log(this.auth.userProfile);
  }

  updateProfile() {
    var url = 'https://' + 'emailcimamireregeltem' + '/api/v2/users/' + this.auth.userProfile.user_id;
    var data = {
      user_metadata: {
        location: 'NewYork'
      }
    };

    this.authHttp.patch(url, data)
    .subscribe(res=>{
      console.log(res.json());
    });
  }


callApi(){
this.authHttp.get('http://localhost:8080/authorized')
.subscribe(res=>console.log(res));

}

}
