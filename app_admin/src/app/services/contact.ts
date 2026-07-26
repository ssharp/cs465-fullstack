import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  tag: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:3000/api/contacts';

    constructor(private http: HttpClient) {}


    // GET /api/contacts
    getMessages(): Observable<ContactMessage[]> {
        return this.http.get<ContactMessage[]>(this.apiUrl);
    }

    // DELETE /api/contacts/:id
    deleteMessage(id: string) {
        return this.http.delete(`http://localhost:3000/api/contact/${id}`);
    }
}
