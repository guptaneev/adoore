import { Component } from '@angular/core';
import { ApiService } from "./api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adoore.';
  private showTopbar: boolean = true;

  constructor(protected apiService: ApiService) {
  }

  toggleTopbar(): void {
    this.showTopbar = !this.showTopbar;
    console.log(this.apiService.getValidCities());
  }

  setTopbar(value: boolean) {
    this.showTopbar = value;
  }

  getTopbar() {
    return this.showTopbar;
  }

  homeButton() {
    this.apiService.clearUserSelectedCities();
    this.setTopbar(true);
  }
}
