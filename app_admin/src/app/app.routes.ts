import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip'
import { Login } from './login/login';
import { ContactListComponent } from './contact-list/contact-list';

export const routes: Routes = [
    { path: 'add-trip', component: AddTrip},
    { path: 'edit-trip', component: EditTrip},
    { path: 'login', component: Login},
    { path: 'admin/contacts', component: ContactListComponent},
    { path: '', component: TripListing, pathMatch: 'full'}
];
