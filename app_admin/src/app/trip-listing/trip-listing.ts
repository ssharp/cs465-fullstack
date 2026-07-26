import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { ChangeDetectorRef } from '@angular/core'; 
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})

export class TripListing implements OnInit {
  trips: Trip[] | null = null;
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
    ) {
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = [...value];
          this.cdr.detectChanges();
          if (value.length > 0)
          {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error: ' + error);
        }
      })
  }

  ngOnInit(): void {
    this.getStuff();
  }

  public isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }

}
