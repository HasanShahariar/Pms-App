import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingEntryComponent } from './pages/parking-entry/parking-entry.component';
import { ParkingListComponent } from './pages/parking-list/parking-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ParkingEntryComponent,
    ParkingListComponent

  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParkingModule { }
