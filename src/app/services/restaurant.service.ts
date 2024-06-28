import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://667da3d1297972455f65e66d.mockapi.io/restaurant-list/restaurant';

  private restaurantsSubject = new BehaviorSubject<any[]>([]);
  restaurants$: Observable<any[]> = this.restaurantsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchRestaurants();
  }

  fetchRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl).pipe(
      tap((restaurants: any[]) => {
        this.restaurantsSubject.next(restaurants);
      }),
      catchError(error => {
        console.error('Error fetching restaurants:', error);
        throw error; // Rethrow or handle as needed
      })
    );
  }

  addRestaurant(restaurant: any) {
    this.http.post<any>(this.apiUrl, restaurant).subscribe(
      newRestaurant => {
        this.restaurantsSubject.next([...this.restaurantsSubject.value, newRestaurant]);
      },
      error => {
        console.error('Error adding restaurant:', error);
      }
    );
  }

  updateRestaurant(updatedRestaurant: any) {
    this.http.put<any>(`${this.apiUrl}/${updatedRestaurant.id}`, updatedRestaurant).subscribe(
      () => {
        const updatedRestaurants = this.restaurantsSubject.value.map(r => r.id === updatedRestaurant.id ? updatedRestaurant : r);
        this.restaurantsSubject.next(updatedRestaurants);
      },
      error => {
        console.error('Error updating restaurant:', error);
      }
    );
  }

  deleteRestaurant(id: number) {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(
      () => {
        const updatedRestaurants = this.restaurantsSubject.value.filter(r => r.id !== id);
        this.restaurantsSubject.next(updatedRestaurants);
      },
      error => {
        console.error('Error deleting restaurant:', error);
      }
    );
  }
}
