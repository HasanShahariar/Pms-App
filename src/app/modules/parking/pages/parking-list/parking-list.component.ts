import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  parkingRecords: any[] = [];

  constructor(
    private parkingService: ParkingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParkingRecords();
  }

  goToEntry(){
    this.router.navigate(["parking/entry"])
  }
  goToDashboard(){
    this.router.navigate([""])
  }

  loadParkingRecords(): void {
    this.parkingService.getParkingRecords().subscribe({
      next: (data) => (this.parkingRecords = data),
      error: (err) => {
        console.log(err);
        
      }
    });
  }

  editEntry(id){
    this.router.navigate(["/parking/info/edit",id])
  }

}
