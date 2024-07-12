import { Component } from '@angular/core';
import { ApiService } from "./api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adoore.';
  message: any;
  citySearch: any;

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
}
