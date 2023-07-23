import {Component, OnInit} from '@angular/core';
import {Appearance, loadStripe } from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {OrderService} from "../../services/order.service";
import data from '../../../assets/cars.json'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cars = data.cars[0]
  constructor(private orderService: OrderService) {

  }

  address: string = "";
  car = data.cars[0];
  days: number = 0;

  startDate: Date = new Date();
  endDate: Date = new Date();

  ngOnInit() {
    this.orderService.currentAddress.subscribe(addr => this.address = addr)
    this.orderService.currentSelectedCar.subscribe(car => this.car = car)
    this.orderService.currentDays.subscribe(days => this.days = days)
    this.orderService.currentStartDate.subscribe(sDate => this.startDate = sDate)
    this.orderService.currentEndDate.subscribe(eDate => this.endDate = eDate)
    this.pay();
  }

  async pay() {
    let appearance = {
      theme: 'night',
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '50px',
      }
    } as Appearance

    let style = {
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#000',
          fontWeight: '500',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#ff9898',
          },
        },
        invalid: {
          iconColor: '#f60000',
          color: '#f60000',
        },
      },
    }




    let stripe = await loadStripe(environment.stripePubKey);
    let elems = stripe?.elements({appearance});

    let cardNum = elems?.create('cardNumber', style);
    let cvc = elems?.create('cardCvc', style);
    let expiry = elems?.create('cardExpiry', style);

    cardNum?.mount('#card-element');
    cvc?.mount('#cvc-element');
    expiry?.mount('#expiry-element');

  }

  getPrice() {
    return this.orderService.rentPrice(this.car.rent, this.days, "EUR")
  }


}
