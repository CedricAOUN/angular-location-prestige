import {Component, OnInit} from '@angular/core';
import carData from '../../../assets/cars.json'
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss']
})
export class CarSelectorComponent implements OnInit {
  cars = carData.cars;
  selectedCarIndex = 0;
  selectedCar = carData.cars[this.selectedCarIndex]


  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.currentSelectedCarIndex.subscribe({
      next: index => this.selectedCarIndex = index
    })
    this.orderService.currentSelectedCar.subscribe({
      next: car => this.selectedCar = car
    })
    this.changeSelected(this.selectedCarIndex)
  }

  changeSelected(index: number) {
    this.selectedCarIndex = index;
    this.orderService.changeSelectedCar(this.cars[index]);
    this.orderService.changeSelectedCarIndex(index);
  }

  getSelectedIndex(index: number) {
    if(index == this.selectedCarIndex) {
      return "selected"
    } else {
      return ""
    }
  }
}
