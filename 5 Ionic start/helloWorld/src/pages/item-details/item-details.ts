import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

    item;

    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.item = navParams.get('item');
    }


    cancel() {
        this.viewCtrl.dismiss();
    }

    ok() {
        this.viewCtrl.dismiss();
    }

}