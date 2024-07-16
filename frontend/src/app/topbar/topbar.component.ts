import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  cityInput: string = '';
  message: any;
  lowercaseInput: string = '';


  constructor(private apiService: ApiService) {

  }

  onClick(): void
  {
    this.apiService.getHelloMessage().subscribe(response => {
        this.message = response;
        console.log(response);
      },
      error => {
        console.error('Error fetching message', error);
      });
  }

  searchButton() {
    this.lowercaseInput = this.cityInput.toLowerCase();
    if (this.apiService.isValidCity(this.lowercaseInput) && !(this.apiService.isUserSelectedCity(this.lowercaseInput))) {
      console.log('Data used', this.lowercaseInput)
      this.apiService.addToUserSelectedCities(this.lowercaseInput);
      console.log(this.apiService.getUserSelectedCities());
    }
    else {
      console.log('Invalid/Duplicate city', this.cityInput);
    }
  }

  ngOnInit(): void { }
}



