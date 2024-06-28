import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface RestaurantData {
  name: string;
  description: string;
  location: string;
  city:string;
  phone:number;
  rating:number
}

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  restaurantForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRestaurantComponent>) { }


  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      city: [''],
      location: [''],
      phone:[''],
      rating:['']
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.restaurantForm.valid) {
      const restaurantData: RestaurantData = {
        name: this.restaurantForm.value.name,
        description: this.restaurantForm.value.description,
        city: this.restaurantForm.value.city,
        location: this.restaurantForm.value.location,
        phone: this.restaurantForm.value.phone,
        rating: this.restaurantForm.value.rating

      };
      this.dialogRef.close(restaurantData);
    } else {
      this.restaurantForm.markAllAsTouched();
    }
  }

}
