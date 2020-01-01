import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AllContactsComponent } from './components/all-contacts/all-contacts.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AllContactsComponent,
    ContactItemComponent,
    HeaderComponent,
    NewContactComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
