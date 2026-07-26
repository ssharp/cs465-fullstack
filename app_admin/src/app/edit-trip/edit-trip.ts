import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data'
import { Trip } from '../models/trip'

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';
  tripCode!: string;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  // -----------------------------
  // DATE FORMAT HELPERS
  // -----------------------------
  private toDateInputValue(iso: string): string {
    // Converts "yyyy-MM-ddT08:00:00.000+00:00" → "yyyy-MM-dd"
    return iso.split('T')[0];
  }

  private toIsoTimestamp(date: string): string {
    // Converts "yyyy-MM-dd" → "yyyy-MM-ddT08:00:00.000+00:00"
    return `${date}T08:00:00.000+00:00`;
  }

  ngOnInit(): void {
    // Retrieve stashed trip ID
    this.tripCode = localStorage.getItem("tripCode") || '';
    if (!this.tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:' + this.tripCode);

    this.editForm = this.formbuilder.group({
      code: [this.tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })

    this.tripData.getTrip(this.tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value;

          // Patch values, but convert the ISO timestamp for the date input
          this.editForm.patchValue({
            ...value,
            start: this.toDateInputValue(value.start)
          });

          this.message = value
            ? `Trip: ${this.tripCode} retrieved`
            : 'No Trip Retrieved!';

          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  onSubmit()
  {
    this.submitted = true;

    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      // Convert date back to full ISO timestamp before sending to API
      const payload = {
        ...formValue,
        start: this.toIsoTimestamp(formValue.start)
      };

      this.tripData.updateTrip(this.tripCode, payload)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigateByUrl('');
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}