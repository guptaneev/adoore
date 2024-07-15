import { Component, OnInit } from '@angular/core';
import {CitiesListComponent} from "../cities-list/cities-list.component";
import {CityData} from "../city-data";
import {TopbarComponent} from "../topbar/topbar.component";

@Component({
  selector: 'app-city-search-results',
  templateUrl: './city-search-results.component.html',
  styleUrls: ['./city-search-results.component.css']
})
export class CitySearchResultsComponent implements OnInit {
  userCitiesList: string[] = [];

  constructor(private topbarComponent:TopbarComponent) {
    this.userCitiesList = this.topbarComponent.userCities;
  }
  ngOnInit(): void {
  }



}
