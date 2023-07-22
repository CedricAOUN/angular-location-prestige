import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class OrderService {
  private selectedCar = new BehaviorSubject<any>({});
  private address = new BehaviorSubject<string>("");
  private days = new BehaviorSubject<number>(0);
  private startDate = new BehaviorSubject<Date>(new Date);
  private endDate = new BehaviorSubject<Date>(new Date);

  currentSelectedCar = this.selectedCar.asObservable();
  currentAddress = this.address.asObservable();
  currentDays = this.days.asObservable();
  currentStartDate = this.startDate.asObservable();
  currentEndDate = this.endDate.asObservable();

  changeSelectedCar(car: object) {
    this.selectedCar.next(car);
  }
  changeAddress(addr: string) {
    this.address.next(addr);
  }
  changeDays(d: number) {
    this.days.next(d);
  }

  changeStartDate(date: Date) {
    this.startDate.next(date)
  }

  changeEndDate(date: Date) {
    this.endDate.next(date)
  }




  rentPrice(perDayPrice: number, days: number, rate: 'USD' | 'EUR') {
    if(days == 0) {
      days = 1;
    }
    if(rate == "USD") {
      return `${this.convertToUsd((perDayPrice * days))}$`
    } else {
      return `${(perDayPrice * days).toFixed(2)}€`
    }
  }


  convertToUsd(price: number) {
    return price * this.rate!;
  }


}
