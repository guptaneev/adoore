import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../api-service.service';
import {NotificationService} from "../notification.service";
import {AppComponent} from "../app.component";

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
  cityOptions: string[] = ['Austin','Dallas','Houston'];

  constructor(private apiService: ApiService, private notificationService: NotificationService, private appComponent: AppComponent) {
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

  goToResults() {
    this.appComponent.toggleTopbar()
  }

  searchButton() {
    this.lowercaseInput = this.cityInputControl.value.toLowerCase();
    if (this.apiService.isUserSelectedCity(this.lowercaseInput)) {
      this.notificationService.show('Cannot input duplicate city "' + this.cityInputControl.value + '", try again.');
    } else {
      if (!(this.apiService.isValidCity(this.lowercaseInput))) {
        this.notificationService.show('City "' + this.cityInputControl.value + '" not in city list, try again.')
      } else {
        this.notificationService.show('Inputted city ' + this.apiService.capitalizeFirstLetter(this.lowercaseInput) + ' accepted.');
        this.apiService.addToUserSelectedCities(this.lowercaseInput);
      }
    }
  }

    ngOnInit(): void {}
}
