

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { Auth } from './auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Auth,AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
