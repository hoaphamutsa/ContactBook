import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/Contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService,
              private router : Router) { }

  ngOnInit() {
    this.contactService.getAllContacts().subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  OnDeleteContact(contactName: string) {
    return this.contactService.removeContact(contactName).subscribe(
        response => {
          if (!response['result']) {
            alert('Something wrong happened');
          }
          else {
            document.location.href = '/';
            alert(`Contact Name: ${contactName} has been deleted`);
          }
        });
  }
}
