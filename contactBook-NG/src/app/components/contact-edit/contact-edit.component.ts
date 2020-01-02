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
  contactID: number;

  constructor(private contactService : ContactService,
              private router : Router,
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
    console.log("contact change clicked");
  }
}
