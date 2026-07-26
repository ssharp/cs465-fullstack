import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})

export class AddTrip implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripData,
    private router: Router
  ) { }

  // -----------------------------
  // DATE FORMAT HELPER
  // -----------------------------
  private toIsoTimestamp(date: string): string {
    // Converts "yyyy-MM-dd" → "yyyy-MM-ddT08:00:00.000+00:00"
    return `${date}T08:00:00.000+00:00`;
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  public onSubmit() {
    console.log("FORM VALUE:", this.addForm.value);
    this.submitted = true;

    if (this.addForm.valid) {

      // Convert date to full ISO timestamp before sending
      const trip = {
        ...this.addForm.value,
        start: this.toIsoTimestamp(this.addForm.value.start)
      };

      delete trip.id;

      this.tripService.addTrip(trip)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigateByUrl('');
          },
          error: (error: any) => {
            console.error('Error: ' + error);
          }
        });
    }
  }
  // get the form short name to access form fields
  get f() { return this.addForm.controls; }
}
