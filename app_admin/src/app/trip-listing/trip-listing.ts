import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { trips } from '../data/trips'
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})

export class TripListing implements OnInit {
  trips: Array<any> = trips;
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router
    ) {
    console.log('TripListing.constructor()');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips.push(...value);
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
    console.log('ngOnInit');
    this.getStuff();
  }
}
