import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userCities: string[] = [];
  cityInput: string = '';
  cityList: string[] = ['austin', 'houston', 'dallas'];
  lowercaseInput: string = '';

  constructor() { }

  searchButton() {
    this.lowercaseInput = this.cityInput.toLowerCase();
    if (this.cityList.includes(this.lowercaseInput) && !(this.userCities.includes(this.lowercaseInput))) {
      console.log('Data used', this.lowercaseInput)
      this.userCities.push(this.lowercaseInput);
      console.log(this.userCities);
    }
    else {
      console.log('Invalid/Duplicate city', this.cityInput);
    }
  }

  ngOnInit(): void { }
}



