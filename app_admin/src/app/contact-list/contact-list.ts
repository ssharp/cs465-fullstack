import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactMessage } from '../services/contact';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactListComponent implements OnInit {

  searchTerm: string = '';
  messages: ContactMessage[] = [];
  filteredMessages: ContactMessage[] = [];

  constructor(
    private contactService: ContactService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loadContacts(): void {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages = [...data];
        this.filteredMessages = [...data];

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load contacts:', err);
      }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredMessages = this.messages.filter(msg =>
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.tag.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term)
    );
  }

  delete(id: string): void {
    if (!confirm("Are you sure you want to delete this message?")) return;

    this.contactService.deleteMessage(id).subscribe({
      next: () => {
        // Remove from local arrays
        this.messages = this.messages.filter(m => m._id !== id);
        this.filteredMessages = this.filteredMessages.filter(m => m._id !== id);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to delete message:", err);
      }
    });
  }
}
