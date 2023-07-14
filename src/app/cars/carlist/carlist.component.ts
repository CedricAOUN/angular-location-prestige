import { Component } from '@angular/core';
import data from '../../../assets/cars.json';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss']
})
export class CarlistComponent {
  cars = data.cars;
  selected = data.cars[0];

  setSelected(index: number) {
    this.selected = data.cars[index];
  }
}
