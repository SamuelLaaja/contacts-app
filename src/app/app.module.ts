import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactListComponent} from './contact/contact-list/contact-list.component';
import {ContactListItemComponent} from './contact/contact-list/contact-list-item/contact-list-item.component';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {ContactService} from './contact/services/contact.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule, MatToolbarModule} from '@angular/material';
import {ContactDetailsComponent } from './contact/contact-list/contact-details/contact-details.component';
import {FormsModule} from '@angular/forms';
import { ContactAddressPipe } from './contact/pipes/contact-address.pipe';

const routes: Routes = [
{
    path: 'contacts/:id',
    component: ContactDetailsComponent
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
  ],
  imports: [
    BrowserModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
