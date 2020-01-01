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
  contact: Contact =  new Contact("","","","");

  constructor(private contactService : ContactService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    const contactName = this.route.snapshot.params['name'];
    this.contactService.getContact(contactName).subscribe(contact => {
      
      this.contact = new Contact(
        contact[0], contact[1], contact[2], contact[3]
      );
    });
    
  }

}
