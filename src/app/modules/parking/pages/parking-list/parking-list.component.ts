import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  parkingRecords: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadParkingRecords();
  }

  loadParkingRecords(): void {
    this.parkingService.getParkingRecords().subscribe({
      next: (data) => (this.parkingRecords = data),
      error: () => alert('Failed to load parking records'),
    });
  }

}
