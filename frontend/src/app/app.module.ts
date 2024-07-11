import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule,
    MatTooltipModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
