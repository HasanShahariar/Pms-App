import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-parking-entry',
  templateUrl: './parking-entry.component.html',
  styleUrls: ['./parking-entry.component.css']
})
export class ParkingEntryComponent implements OnInit {

  parkingForm: FormGroup;
  vehicleTypes: string[] = ['Car', 'Truck', 'Micro-bus', 'Bike'];
  statusList: string[] = ['In', 'Out']
  entryId: number;

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private _datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {

    this.createParkingForm()

    this.route.params.subscribe((params) => {
      const itemId = +params["id"];
      this.entryId = itemId;
      if (itemId) {
        this.getParkingById(itemId);
      }
    });

  }

  goToList(){
    this.router.navigate(["parking/list"])
  }

  getParkingById(id) {
    this.parkingService.getParkingByInfoId(id).subscribe(
      (data) => {
        this.parkingForm.patchValue(data);
        this.parkingForm.get("entryTime").patchValue(this._datePipe.transform(
          new Date(data.entryTime),
          "yyyy-MM-dd"
        ),)
      },
      (err) => {
        console.log(err);

      }
    )
  }



  createParkingForm() {
    this.parkingForm = this.fb.group({
      licenseNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      ownerAddress: ['', Validators.required],
      entryTime: [this._datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required],
      exitTime: [null],
      status: ['In', Validators.required],
      parkingCharge: [0]
    });
  }

  calculateParkingCharge(vehicleType: string): number {
    switch (vehicleType) {
      case 'Car': return 20;
      case 'Truck': return 40;
      case 'Micro-bus': return 60;
      case 'Bike': return 10;
      default: return 15;
    }
  }

  onSelectVehicleType(vehicleType) {
    if (vehicleType) {
      this.parkingForm.get("parkingCharge").patchValue(this.calculateParkingCharge(vehicleType));
    }
    else {
      this.parkingForm.get("parkingCharge").patchValue(0);
    }

  }

  onSubmit(): void {

    if (this.parkingForm.invalid) {
      this.alert.Warning('Please provide valid information');
      return;
    }



    if (this.entryId) {
      this.parkingService.updateParkingEntry(this.entryId, this.parkingForm.value).subscribe({
        next: () => {

          this.alert.success('Parking entry created successfully!');
          this.router.navigate(['/parking/list']);
        },
        error: () => {
          this.alert.Failed('Failed to create parking entry');

        }
      });

    }
    else {
      this.parkingService.createParkingEntry(this.parkingForm.value).subscribe({
        next: () => {

          this.alert.success('Parking entry created successfully!');
          this.router.navigate(['/parking/list']);
        },
        error: () => {
          this.alert.Failed('Failed to create parking entry');

        }
      });
    }
  }



}

