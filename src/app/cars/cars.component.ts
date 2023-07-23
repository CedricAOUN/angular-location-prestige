import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent extends AppComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  minDate: Date = new Date();

  constructor(private orderService: OrderService) {
    super();
  }
  ngOnInit() {
    this.orderService.currentStartDate.subscribe({
      next: date => this.startDate = date,
      error: err => {}
    })
    this.orderService.currentEndDate.subscribe({
      next: date => this.endDate = date,
      error: err => {}
    })
  }

  changeStart(date: Date) {
    this.orderService.changeStartDate(date);
    this.orderService.changeDays(this.orderService.calculateDays(date, this.endDate));
  }
  changeEnd(date: Date) {
    this.orderService.changeEndDate(date);
    this.orderService.changeDays(this.orderService.calculateDays( this.startDate, date));
  }
}
