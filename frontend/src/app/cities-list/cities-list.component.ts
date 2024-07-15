import {Component, Input, OnInit} from '@angular/core';
import {TopbarComponent} from "../topbar/topbar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  userCitiesList: string[] = [];

  constructor(private topbarComponent: TopbarComponent, private router: Router) {
    this.userCitiesList = this.topbarComponent.userCities;
  }

  goToResults() {
    this.router.navigate(['/results'])
  }


  ngOnInit(): void {
  }
}
