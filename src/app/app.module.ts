import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OfferDetailsComponent } from './offers/offer-details/offer-details.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferDetailsComponent,
    OfferListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
