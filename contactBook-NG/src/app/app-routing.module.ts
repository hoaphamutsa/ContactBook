import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllContactsComponent } from '../app/components/all-contacts/all-contacts.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';

const routes: Routes = [
  { path: '', component: AllContactsComponent },
  { path: 'edit/:name', component: ContactEditComponent },
  { path: 'new', component: NewContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
