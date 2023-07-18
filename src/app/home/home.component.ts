import { Component } from '@angular/core';
import data from '../../assets/cars.json'
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppComponent {
  cars = data.cars
}
