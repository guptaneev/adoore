import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsComponent } from './icons/icons.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ComponentsModule} from "./components/components.module";

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
        ComponentsModule
    ],
  declarations: [AppComponent, DashboardComponent, IconsComponent, AdminLayoutComponent, MapsComponent, NotificationsComponent, TableListComponent, TypographyComponent, UserProfileComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
