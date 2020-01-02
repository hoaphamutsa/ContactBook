import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() rawContact: string[];
  contact: Contact;
  @Output() deleteContactEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.contact = new Contact(
      this.rawContact[0],
      this.rawContact[1],
      this.rawContact[2],
      this.rawContact[3]);
  }

  deleteContact() {
    this.deleteContactEmitter.emit(this.contact.name);
  }
}
