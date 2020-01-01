import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/Contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() rawContact: any;
  contact: Contact;

  constructor(private contactService: ContactService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.contact = new Contact(
      this.rawContact[0],
      this.rawContact[1],
      this.rawContact[2],
      this.rawContact[3]);
  }

  navigateToEdit() {
    this.router.navigate(
      ['/edit', this.contact.name]);
  }
}
