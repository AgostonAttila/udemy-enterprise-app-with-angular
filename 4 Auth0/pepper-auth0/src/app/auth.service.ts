import { Injectable } from '@angular/core'
import { tokenNotExpired } from 'angular2-jwt'

declare var Auth0Lock: any;


@Injectable()
export class Auth {
    lock = new Auth0Lock('L9pOo1JSal0qRJ17BdimaeqOlIh7qqYG', 'atesz014.eu.auth0.com', {
        /* plussz parameter
         additionalSignUpFields: [
              {
                  name: 'Location',
                  placeholder: 'Where you live',
                  validator: function (value) {
                      return {
                          valid: value.length >= 5,
                          hint: 'Address should be min 5'
                      }
                  }
              }
          ]*/

        //nodeJS-es pelda
        auth: {
            params: {
                scope:'openid profile',
                audience: 'https://api.pepper.com'
            }
        }

    });

    userProfile;

    constructor() {

        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        this.lock.on('authenticated', authResult => {
            localStorage.setItem('id_token', authResult.idToken); //nodeJS nél accesToken

            //getUserInfo  ás accesToken
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    console.log("ERROR", error);
                    return;
                }


                localStorage.setItem('profile', JSON.stringify(profile));

                this.userProfile = profile;
            })
        });
    }



    public login() {
        this.lock.show();
    }

    public isAuthenticated() {
        return tokenNotExpired();
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = null;
    }

}