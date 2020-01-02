import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/Contact';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;

  constructor(private contactService : ContactService) { }

  ngOnInit() {
  }

  onSubmit() {
    const contact = new Contact(
      this.name,
      this.phoneNumber,
      this.address,
      this.email
    );
    this.contactService.createContact(contact).subscribe(
      response => {
        if (!response['result']) {
          alert('Something wrong happened');
        }
        else {
          document.location.href = '/';
          alert(`Contact Name: ${contact.name} has been created.`);
        }
      }
    );
  }
}
