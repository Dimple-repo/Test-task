import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Restaurant } from '../models/restaurant.model';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-restaurant',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.scss'
})
export class EditRestaurantComponent {
    restaurantForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<EditRestaurantComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Restaurant
    ) {
      this.restaurantForm = this.fb.group({
        id: [data.id],
        name: [data.name],
        description: [data.description],
        location: [data.location],
        city:[data.city],
        phone:[data.phone],
        rating:[data.rating]
      });
    }
  
    onSave(): void {
      this.dialogRef.close(this.restaurantForm.value);
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
}
