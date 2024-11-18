import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../shared/services/alert.service';


@Component({
  selector: 'app-parking-entry',
  templateUrl: './parking-entry.component.html',
  styleUrls: ['./parking-entry.component.css']
})
export class ParkingEntryComponent implements OnInit {

  parkingForm: FormGroup;
  vehicleTypes: string[] = ['Car', 'Truck', 'Micro-bus', 'Bike'];

  constructor(
    private fb: FormBuilder,
     private parkingService: ParkingService,
     private alert: AlertService
    ) {
    this.parkingForm = this.fb.group({
      licenseNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      ownerAddress: ['', Validators.required],
      entryTime: ['', Validators.required],
      status: ['In', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    
    if (this.parkingForm.valid) {
      this.parkingService.createParkingEntry(this.parkingForm.value).subscribe({
        next: () => {
      
          this.alert.success('Parking entry created successfully!');

        },
        error: () => {
          this.alert.Failed('Failed to create parking entry.');
         
      }
      });
    }
    else{
      alert('Please provide valid information');
    }

  }


}
