import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditRestaurantComponent', () => {
  let component: EditRestaurantComponent;
  let fixture: ComponentFixture<EditRestaurantComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditRestaurantComponent>>;

  const mockRestaurantFormData = {
    id: '1',
    name: 'Test Restaurant',
    description: 'Test Description',
    location: 'Test Location',
    city: 'Test City',
    phone: '1234567890',
    rating: 4.5
  }

  beforeEach(waitForAsync(() => {
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {
            id: '1',
            name: 'Test Restaurant',
            description: 'Test Description',
            location: 'Test Location',
            city: 'Test City',
            phone: '1234567890',
            rating: 4.5
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestaurantComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EditRestaurantComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided data', () => {
    expect(component.restaurantForm.value).toEqual(mockRestaurantFormData);
  });
});
