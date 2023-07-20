import {Component, OnInit} from '@angular/core';
import data from '../../../assets/cars.json';
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss']
})
export class CarlistComponent implements OnInit{
  cars = data.cars;
  selected = data.cars[0];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.currentSelectedCar.subscribe(car => this.selected = car);
    this.setSelected(0);
  }

  setSelected(index: number) {
    this.selected = data.cars[index];
  }
}
