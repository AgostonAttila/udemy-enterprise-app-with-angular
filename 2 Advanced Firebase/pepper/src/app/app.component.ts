import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines');

    //Join
    /* this.restaurants = this.af.database.list('/restaurants')
       .map(restaurants => {
 
         restaurants.map(restaurant => {
           restaurant.cuisineType = this.af.database.object('/cuisines'+ restaurant.cuisine);
         });
         return restaurants;
       });
 */

    //Complex Join
    this.restaurants = this.af.database.list('/restaurants')
      .map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.featureTypes = [];
          for (var f in restaurant.features)
            restaurant.featureTypes.push(this.af.database.object('/features/' + f))
        });
        return restaurants;
      });

    //Exist
    this.exists = this.af.database.object('/restaurants/1/features/1');

    this.exists.take(1).subscribe(x => {
      if (x && x.$value) { }
      else { }
      // ha létezik csin valamit
    });

    //Sorting
    this.cuisines = this.af.database.list('/cuisines', {
      query: {
        orderByKey: true //orderByValue,orderByChild
      }
    });

    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'address/city' //name //orderByValue,orderByChild
      }
    });

    //Filtering
    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        equalTo: 5 //csak 5
      }
    });

    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        startAt: 3,
        endAt: 4
      }
    });

    //Indexes
    this.cuisines = this.af.database.list('/cuisines', {
      query: {
        orderByValue: true,
        equalTo: 'Italian'
      }
    });


    //++Rules
    /*
    {
  "rules": {
    ".read": true,
    ".write": true,
      "restaurants":{
        ".indexOn": ["rating","address/city"]
      },
     "cuisines":{
        ".indexOn": ".value"
      }
  }
}
    */


    //Limit
    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        equalTo: 5,
        limitToLast: 50 //LimitToFirst:
      }
    });


    //Multiple updates

    //restaurants
    //restarants-by-city/camvberwell


    this.af.database.list('/restaurants').push({ name: '' })
      .then(x => {
        //x.key

        let restaurant = { name: 'My Rest' };

        let update = {};
        update['/restaurant/' + x.key] = restaurant;
        //update['/restaurant-by-city/camberwell'+ x.key] = true;
        update['/restaurant-by-city/camberwell' + x.key] = restaurant;  //ha törölni akarom akkor null


        this.af.database.object('/').update(update);
      });


  }
}
