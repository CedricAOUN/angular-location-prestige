import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {OrderService} from "../../services/order.service";
import {MapService} from "../../services/map.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit, OnInit {

  private map: any;
  private icon = L.icon({
    iconUrl: '../../../assets/marker.svg',
    iconSize: [50, 100],
    iconAnchor: [25, 75],
  })
  private addressIcon = L.icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/009/385/892/original/pin-location-icon-sign-free-png.png',
    iconSize: [50, 60],
    iconAnchor: [25, 60],
  })

  private branches = [
    {
      lat: 48.85542,
      lng: 2.34596,
      name: 'Paris HQ'
    },
    {
      lat: 43.7317,
      lng: 7.4175,
      name: 'Monaco HQ'
    },
    {
      lat: 43.3141,
      lng: 5.3945,
      name: 'Marseille HQ'
    },
    {
      lat: 48.1065,
      lng: -1.6734,
      name: 'Rennes HQ'
    }
  ]

  constructor(private orderService: OrderService, private mapService: MapService) {
  }

  ngOnInit() {
    this.orderService.currentAddress.subscribe(addr => this.currentAddress = addr)
  }


  initMap(): void {
    this.map = L.map('map', {
      center: [46.604, 2.109],
      zoom: 5
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.branches.forEach((b) => {
      L.marker([b.lat, b.lng], {icon: this.icon, title: `Location Prestige - ${b.name}`}).addTo(this.map);
    })

  }

  ngAfterViewInit(): void {
    this.initMap();
    if (this.currentAddress) {
      this.addressSearch(this.currentAddress)
    }
  }


  searchValue: string = "";
  currentAddress: string = "";
  closeBranch: string = "";
  errorMsg: string = "";

  addressSearch(value: string) {
    this.errorMsg = "";
    this.mapService.searchByAddress(value).subscribe({
      next: (data: any) => {
        const adr = data[0].address;
        console.log(data);
        this.orderService.changeAddress(`${adr.house_number} ${adr?.road + ","} ${adr?.postcode + ","} ${adr.town + ","} ${adr?.country}`);
        this.closestBranch(data[0].lat, data[0].lon);
        this.addAddressMarker(data[0].lat, data[0].lon);
      },
      error: err => {

      }
    });
  }

  closestBranch(lat: number, lng: number) {

    let bodyData: { locations: number[][], destinations: number[] } = {locations: [[lng, lat]], destinations: [0]}
    let durations: number[];

    this.branches.forEach((b) => {
      bodyData.locations.push([b.lng, b.lat])
    });

    this.mapService.getDistanceDifference(bodyData).subscribe({
      next: (data: any) => {
        durations = data.durations.slice(1);
        let min: number = Math.min(...durations);
        let index: number = -1;
        durations.forEach((arr, i) => {
          if (arr == min) {
            index = i;
          }
        })
        this.closeBranch = this.branches[index].name
        this.addAddressPolyline([lat, lng], [this.branches[index].lat, this.branches[index].lng])
      },
      error: err => {

      }
    });
  }

  private addressMarker: L.Marker = new L.Marker([0, 0]);

  addAddressMarker(lat: number, lng: number) {
    if (this.map.hasLayer(this.addressMarker)) {
      this.map.removeLayer(this.addressMarker);
    }
    this.addressMarker = L.marker([lat, lng], {icon: this.addressIcon, title: "Address"});
    this.map.addLayer(this.addressMarker)
    this.map.flyTo([lat, lng], 12);
  }

  private addressPolyline: L.Polyline = new L.Polyline([[0,0],[0,0]])
  addAddressPolyline(addressLatLngs: [aLat: number, aLng: number], branchLatLngs: [bLat: number, bLng: number ]) {
    if (this.map.hasLayer(this.addressPolyline)) {
      this.map.removeLayer(this.addressPolyline);
    }
    this.addressPolyline = L.polyline([addressLatLngs, branchLatLngs],{color: 'red'} );
    this.map.addLayer(this.addressPolyline);
  }
}
