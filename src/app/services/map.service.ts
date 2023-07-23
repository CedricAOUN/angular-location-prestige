import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  searchByAddress(address: string) {
    return this.http.get(`https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${address}`);
  }
  getDistanceDifference(bodyData: { locations: number[][], destinations: number[] }) {
    return this.http.post(`https://api.openrouteservice.org/v2/matrix/driving-car/`, bodyData, {headers: {Authorization: '5b3ce3597851110001cf6248299e46940eaf4b569a4ea2043a09fe5f'}});
  }
}
