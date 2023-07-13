import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-location-prestige';

  scrollToId(elem: HTMLElement): void {
    elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
