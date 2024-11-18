import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingEntryComponent } from './pages/parking-entry/parking-entry.component';
import { ParkingListComponent } from './pages/parking-list/parking-list.component';

const routes: Routes = [
  {
    path:'entry',
    component:ParkingEntryComponent
  },
  {
    path:'list',
    component:ParkingListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
