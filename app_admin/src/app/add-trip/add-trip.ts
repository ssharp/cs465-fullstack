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
      const trip = { ...this.addForm.value };

      delete trip.id;
      
      this.tripService.addTrip(this.addForm.value)
        .subscribe( {
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Error: ' + error);
        }});
    }
  }
  // get the form short name to access form fields
  get f() { return this.addForm.controls; }
}
