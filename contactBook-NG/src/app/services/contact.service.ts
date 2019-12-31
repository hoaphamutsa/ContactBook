import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactUrl:string = 'http://127.0.0.1:5002/contacts';

  constructor(private http: HttpClient) { }

  // Get Contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.contactUrl}`);
  }


}
