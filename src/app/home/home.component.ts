import { Component } from '@angular/core';
import data from '../../assets/cars.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cars = data.cars
  scrollToId(elem: HTMLElement): void {
    elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
