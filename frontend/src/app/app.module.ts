import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import {AppRoutingModule} from "./app.routing.module";
import {TopbarComponent} from "./topbar/topbar.component";
import {CitiesListComponent} from "./cities-list/cities-list.component";
import {CitySearchResultsComponent} from "./city-search-results/city-search-results.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from "ng2-charts";
import { LineChartComponent } from "./line-chart/line-chart.component";
import {Line} from "chartist";
import {APP_INITIALIZER} from "@angular/core";
import {ApiService} from "./api-service.service";
import {initializeApp} from "./app-init";

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CitiesListComponent,
    CitySearchResultsComponent,
    LineChartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(), // Added .forRoot()
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    CommonModule,
    NgChartsModule,
  ],
  providers: [TopbarComponent, AppComponent, CitySearchResultsComponent, CitiesListComponent,
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ApiService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
