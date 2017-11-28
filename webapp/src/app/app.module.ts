import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
import {ContactListItemComponent} from './contact/contact-list/contact-list-item/contact-list-item.component';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule, MatToolbarModule} from '@angular/material';
import {ContactDetailsComponent } from './contact/contact-list/contact-details/contact-details.component';
import {FormsModule} from '@angular/forms';
import { ContactAddressPipe } from './contact/pipes/contact-address.pipe';
import {ContactService} from './contact/services/contact.service';
import {ContactHttpService} from './contact/services/contact-http.service';
import {HttpClientModule} from '@angular/common/http';
// import { LoginComponent } from './contact/user/login/login.component';
// import { CanActivate } from '@angular/router';
// import {AuthenticationGuard} from './contact/guard/authentication.guard';

const routes: Routes = [

  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'contacts/:id',
    component: ContactDetailsComponent
    // ,
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'contacts',
    component: ContactListComponent
  },
  {
    path: 'add-contact',
    component: ContactDetailsComponent
  },
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: '**',
    component: ContactListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDetailsComponent,
    ContactAddressPipe
    // , LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ContactService,
    ContactHttpService
    // , AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
