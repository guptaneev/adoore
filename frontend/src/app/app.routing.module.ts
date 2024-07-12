import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule} from "@angular/common";
import { TopbarComponent } from './topbar/topbar.component';
import { ScrollingListComponent } from "./scrolling-list/scrolling-list.component";

const routes: Routes = [
  { path: '/HousingPricePilot-1.0-SNAPSHOT/', component: TopbarComponent, title: 'Home Page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
