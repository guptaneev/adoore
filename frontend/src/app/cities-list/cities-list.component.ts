import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  userCitiesList: string[] = this.apiService.getUserSelectedCities();

  constructor(private apiService: ApiService, private appComponent: AppComponent) {

  }
  goToResults() {
    this.appComponent.toggleTopbar()
  }

  ngOnInit(): void {
  }
}
