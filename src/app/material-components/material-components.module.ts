import { NgModule } from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const materialModules = [
  MatButtonModule,
  MatListModule,
  MatInputModule,
  BrowserAnimationsModule,
  MatIconModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialComponentsModule { }
