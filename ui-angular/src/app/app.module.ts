import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CustomersComponent } from './customers/customers.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//bottstrap:
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomersComponent
  ],
  imports: [
    AlertModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
