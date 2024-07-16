import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-city-search-results',
  templateUrl: './city-search-results.component.html',
  styleUrls: ['./city-search-results.component.css']
})
export class CitySearchResultsComponent implements OnInit {
  userCitiesList: string[] = this.apiService.getUserSelectedCities();

  constructor(private apiService: ApiService) {
    console.log(this.userCitiesList);
  }

  ngOnInit(): void {
  }

}
