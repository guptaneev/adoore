import { Component, OnInit } from '@angular/core';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  cityInput: string = '';
  citySearch: string = '';

  constructor() { }

  searchButton() {
    this.citySearch = this.cityInput;
    console.log('Data used ', this.citySearch)
  }
  ngOnInit(): void { }
}



