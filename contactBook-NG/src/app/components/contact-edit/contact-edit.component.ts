import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/Contact';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;

  constructor(private contactService : ContactService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    const contactName = this.route.snapshot.params['name'];
    this.contactService.getContact(contactName).subscribe(contact => {
      this.name = contact[0];
      this.phoneNumber = contact[1];
      this.address = contact[2];
      this.email = contact[3];
    });
    
  }

  onEditContact() {
    const contact = new Contact(
      this.name,
      this.phoneNumber,
      this.address,
      this.email
    );
    this.contactService.updateContact(contact).subscribe(
      response => {
        if (!response['result']) {
          alert('Something wrong happened');
        }
        else {
          document.location.href = '/';
          alert(`Contact Name: ${contact.name} has been changed.`);
        }
      }
    );
  }
}
