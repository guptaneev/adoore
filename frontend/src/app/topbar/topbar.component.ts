import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  cityInputControl = new FormControl();
  filteredCities: Observable<string[]>;
  message: any;
  lowercaseInput: string = '';
  cityOptions: string[] = ['Austin', "Dallas", "Houston"];

  constructor(private apiService: ApiService) {
    this.filteredCities = this.cityInputControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onClick(): void {
    this.apiService.getHelloMessage().subscribe(response => {
      this.message = response;
      console.log(response);
    }, error => {
      console.error('Error fetching message', error);
    });
  }

  searchButton() {
    this.lowercaseInput = this.cityInputControl.value.toLowerCase();
    if (this.apiService.isValidCity(this.lowercaseInput) && !(this.apiService.isUserSelectedCity(this.lowercaseInput))) {
      console.log('Data used', this.lowercaseInput);
      this.apiService.addToUserSelectedCities(this.lowercaseInput);
      console.log(this.apiService.getUserSelectedCities());
    } else {
      console.log('Invalid/Duplicate city', this.cityInputControl.value);
    }
  }

  ngOnInit(): void { }
}
