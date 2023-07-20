import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class OrderService {
  private selectedCar = new BehaviorSubject<any>({});
  private address = new BehaviorSubject<string>("");
  private days = new BehaviorSubject<number>(0);

  currentSelectedCar = this.selectedCar.asObservable();
  currentAddress = this.address.asObservable();
  currentDays = this.days.asObservable();

  changeSelectedCar(car: object) {
    this.selectedCar.next(car);
  }
  changeAddress(addr: string) {
    this.address.next(addr);
  }
  changeDays(d: number) {
    this.days.next(d);
  }

  rentPrice(perDayPrice: number, days: number, rate: 'USD' | 'EUR') {
    if(rate == "USD") {
      return `${this.convertToUsd((perDayPrice * days))}$`
    } else {
      return `${perDayPrice * days}€`
    }
  }


  async convertToUsd(price: number) {
    let usdRate: number = 0;
    await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_bxZZ3AqJUdqD337rhkVrNBqNauLvIg4xq9Vj6i9c&currencies=USD&base_currency=EUR")
      .then(res => res.json())
      .then(res => usdRate = res.data.USD)

    return price * usdRate
  }


}
