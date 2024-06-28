import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

export const routes: Routes = [
  { path: 'restaurants', component: RestaurantListComponent },
  { path: '**', redirectTo: '/restaurants', pathMatch: 'full' } // Handle any other routes
];
