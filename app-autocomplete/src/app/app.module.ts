import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {Autocomplete} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    Autocomplete
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [Autocomplete],
})
export class AppModule {
}
