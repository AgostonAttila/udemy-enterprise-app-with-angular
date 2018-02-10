import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AppVersion, Contacts, Camera, Geolocation, GoogleMap } from '@ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts;

  constructor(public navCtrl: NavController, platform: Platform) {
    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(v => console.log(v))


      Contacts.find(['displayName']).then(contacts => this.contacts = contacts);


      Camera.getPicture(
        {
          sourceType: 0
          //destinaationType
        }).then(imageData => console.log("img", imageData));


      Geolocation.getCurrentPosition().then(pos => console.log("pos", pos));


      let map = new GoogleMap('map');

    });

  }

}
