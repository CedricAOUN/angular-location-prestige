import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeModule} from "./home/home.module";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { CarlistComponent } from './cars/carlist/carlist.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { LocationComponent } from './cars/location/location.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CheckoutComponent} from "./cars/checkout/checkout.component";
import {OrderService} from "../services/order.service";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    AboutComponent,
    ContactComponent,
    CarlistComponent,
    LocationComponent,
    CheckoutComponent,
  ],
  imports: [
    HomeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    LeafletModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
