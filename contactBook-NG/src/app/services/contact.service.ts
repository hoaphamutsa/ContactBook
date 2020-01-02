import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactUrl:string = 'http://127.0.0.1:5002/contacts/api/v1.0';

  constructor(private http: HttpClient) { }

  // Get Contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.contactUrl}`);
  }

  getContact(contactName: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactUrl}/${contactName}`);
  }

  createContact(contact: Contact):Observable<Contact> {
    return this.http.post<Contact>(
      `${this.contactUrl}`,
      { 'content': contact }, 
      httpOptions );
  }

  removeContact(contactName: string): Observable<any> {
    return this.http.delete<Contact>(`${this.contactUrl}/${contactName}`, { responseType: 'json' });
  }
}
