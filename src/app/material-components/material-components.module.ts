import { NgModule } from '@angular/core';
import {MatButtonModule, MatInputModule, MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const materialModules = [
  MatButtonModule,
  MatListModule,
  MatInputModule,
  BrowserAnimationsModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialComponentsModule { }
