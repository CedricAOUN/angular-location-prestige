import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedCar = new BehaviorSubject<any>({});
  private selectedCarIndex = new BehaviorSubject<number>(0);
  private address = new BehaviorSubject<string>("");
  private days = new BehaviorSubject<number>(0);
  private startDate = new BehaviorSubject<Date>(new Date);
  private endDate = new BehaviorSubject<Date>(new Date);
  private rate: number | null = null;



  currentSelectedCar = this.selectedCar.asObservable();
  currentSelectedCarIndex = this.selectedCarIndex.asObservable();
  currentAddress = this.address.asObservable();
  currentDays = this.days.asObservable();
  currentStartDate = this.startDate.asObservable();
  currentEndDate = this.endDate.asObservable();

  constructor(private http: HttpClient) {
    this.getUsdRate();
  }

  changeSelectedCar(car: any) {
    this.selectedCar.next(car);
  }
  changeSelectedCarIndex(index: number) {
    this.selectedCarIndex.next(index);
  }

  changeAddress(addr: string) {
    this.address.next(addr);
  }
  changeDays(d: number) {
    this.days.next(d);
  }

  changeStartDate(date: Date) {
    this.startDate.next(date);
  }

  changeEndDate(date: Date) {
    this.endDate.next(date);
  }


  getUsdRate() {
      this.http.get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_bxZZ3AqJUdqD337rhkVrNBqNauLvIg4xq9Vj6i9c&currencies=USD&base_currency=EUR').subscribe({
        next: (data: any) => this.rate = data.data.USD,
        error: err => {

        }
      });

  }

  calculateDays(date: Date, returnDate: Date) {
    returnDate.setHours(0,0,0,0);
    date.setHours(0,0,0,0)
    let milliseconds = returnDate.getTime() - date.getTime();
    let days = milliseconds / (1000 * 3600 * 24);
    console.log(days)
    return days;
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
