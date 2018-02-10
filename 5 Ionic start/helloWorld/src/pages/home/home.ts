import { ItemDetailsPage } from './../item-details/item-details';
import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  items = [{description:"Item1"}];


  constructor(public navCtrl: NavController, private modalCtrl: ModalController) { }


  click() {
    console.log("Click");
  }

  selectItem(item) {
   // this.navCtrl.push(ItemDetailsPage, { item: item });
   this.modalCtrl.create(ItemDetailsPage, { item: item }).present();
  }


}
