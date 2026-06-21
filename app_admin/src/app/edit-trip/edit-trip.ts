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
          // Populate our record into the form
          this.editForm.patchValue(value);
          if (!value)
          {
            this.message = 'No Trip Retrieved!'
          }
          else {
            this.message = 'Trip: ' + this.tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  onSubmit()
  {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripData.updateTrip(this.tripCode, this.editForm.value)
      .subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error)
        }
      })
    }
  }
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}