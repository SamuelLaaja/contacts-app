import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
import {ContactListItemComponent} from './contact/contact-list/contact-list-item/contact-list-item.component';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {
  MatSidenavModule, MatSnackBar, MatSnackBarModule, MatToolbarModule,
  MD_ELEMENTS_SELECTOR
} from '@angular/material';
import {ContactDetailsComponent } from './contact/contact-list/contact-details/contact-details.component';
import {FormsModule} from '@angular/forms';
import { ContactAddressPipe } from './contact/pipes/contact-address.pipe';
import {ContactService} from './contact/services/contact.service';
import {ContactHttpService} from './contact/services/contact-http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './user/login/login.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {AuthenticationService} from './user/services/authentication.service';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {HttpInterceptorService} from './user/services/http-interceptor.service';
import {ErrorMessagesService} from './user/services/error-messages.service';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'ca',
    component: AppLayoutComponent,
    children: [
      {
      path: 'contacts/:id',
      component: ContactDetailsComponent,
      canActivate: [AuthenticationGuard]
      },
      {
        path: 'contacts',
        component: ContactListComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'add-contact',
        component: ContactDetailsComponent,
        canActivate: [AuthenticationGuard]
      },
    ]
  },

  {
    path: '**',
    component: ContactListComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDetailsComponent,
    ContactAddressPipe,
    LoginComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ContactService,
    ContactHttpService,
    AuthenticationService,
    AuthenticationGuard,
    ErrorMessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
