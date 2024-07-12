import {Component, Input, OnInit} from '@angular/core';
import {TopbarComponent} from "../topbar/topbar.component";

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
 userCitiesList: string[] = [];

  constructor(private topbarComponent:TopbarComponent) {
     this.userCitiesList = this.topbarComponent.userCities;
  }


  ngOnInit(): void {
  }

  protected readonly console = console;
}
