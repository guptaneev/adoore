import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-city-search-results',
  templateUrl: './city-search-results.component.html',
  styleUrls: ['./city-search-results.component.scss']
})
export class CitySearchResultsComponent implements OnInit {
  userCitiesList: string[] = this.apiService.getUserSelectedCities();

  constructor(protected apiService: ApiService) {
    console.log(this.userCitiesList);
  }

  ngOnInit(): void {
  }

}
