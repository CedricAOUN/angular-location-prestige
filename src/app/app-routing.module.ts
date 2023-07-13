import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CarsComponent} from "./cars/cars.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "cars", component: CarsComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
