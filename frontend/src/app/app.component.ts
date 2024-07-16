import { Component } from '@angular/core';
import { ApiService } from "./api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adoore.';
  showTopbar: boolean = true;

  constructor(private apiService: ApiService) {
  }



  toggleTopbar(): void {
    this.showTopbar = !this.showTopbar;
  }
}
