import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TopbarComponent } from './topbar/topbar.component';
import { HousingLocationComponent } from './housing-location/housing-location.component';
import { DetailsComponent } from './details/details.component';
import { ScrollingListComponent } from './scrolling-list/scrolling-list.component';
import {AppRoutingModule} from "./app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    DetailsComponent,
    ScrollingListComponent,
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
    HousingLocationComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
