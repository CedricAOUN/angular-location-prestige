import { Component, OnInit} from '@angular/core';
import carData from '../../assets/cars.json'
import {AppComponent} from "../app.component";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppComponent implements OnInit {
  cars = carData.cars;
  minDate: Date = new Date();
  errorMsg: string = "";


  address: string = "";

  startDate: Date = new Date();
  returnDate: Date = new Date();

  constructor(private orderService: OrderService, private router: Router) {
    super();

  }

  ngOnInit() {
    this.orderService.currentStartDate.subscribe(sDate => this.startDate = sDate)
    this.orderService.currentEndDate.subscribe(eDate => this.returnDate = eDate)
  }


  preloadCars(addr: string, date: Date, returnDate: Date) {
    if(addr) {
      this.router.navigate(['/cars'])
      this.orderService.changeAddress(addr)
      this.orderService.changeDays(this.orderService.calculateDays(date, returnDate))
      this.orderService.changeStartDate(date)
      this.orderService.changeEndDate(returnDate);
    } else {
      this.errorMsg = "Veuillez saisir une adresse"
    }

  }
}
