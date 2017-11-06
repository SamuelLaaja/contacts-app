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

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: 'contact-list',
    component: ContactListComponent
  },
  {
    path: 'contact-item',
    component: ContactListItemComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent
  ],
  imports: [
    BrowserModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
