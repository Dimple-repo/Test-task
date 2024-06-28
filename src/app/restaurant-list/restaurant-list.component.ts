import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model'; // Adjust path as per your project structure
import { RestaurantService } from '../services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { EditRestaurantComponent } from '../edit-restaurant/edit-restaurant.component';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
  imports: [
    MatToolbarModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatPaginator, 
    HttpClientModule],
  providers: [RestaurantService],
  standalone: true,

})
export class RestaurantListComponent implements OnInit {

  restaurants$: Observable<Restaurant[]> = this.restaurantService.restaurants$;
  displayedColumns: string[] = [
    'name', 
    'description', 
    'city', 
    'location', 
    'phone',
    'rating', 
    'actions'];
  dataSource = new MatTableDataSource<Restaurant>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.fetchRestaurants().subscribe((restaurants: Restaurant[]) => {
        this.dataSource.data = restaurants;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  editRestaurant(restaurant: Restaurant) {
    const dialogRef = this.dialog.open(EditRestaurantComponent, {
      width: '500px',
      data: { ...restaurant }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.updateRestaurant(result);
        this.showNotification('Restaurant updated successfully');
      }
    });
  }

  deleteRestaurant(restaurant: Restaurant) {
    const confirmDelete = confirm(`Are you sure you want to delete ${restaurant.name}?`);
    if (confirmDelete) {
      this.restaurantService.deleteRestaurant(restaurant.id);
      this.showNotification('Restaurant deleted successfully');
    }
  }

  openAddRestaurantDialog(): void {
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.addRestaurant(result);
        this.showNotification('Restaurant added successfully');
      }
    });
  }

  private showNotification(message: string, action: string = 'Success'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
