import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css']
})
export class DashoardComponent implements OnInit {

  dashBoardData: any;
  filterForm:FormGroup;
  lineChart: any;
  pieChart: Chart<"pie", any, unknown>;
  lineChartData: any;

  constructor(
    private service: DashboardService,
    private router: Router,
    private fb:FormBuilder,
    private _datePipe: DatePipe,

  ) { 

    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createFilterForm()
    this.getDashboardData()
    
  }

  createFilterForm(){

    const formattedDate = new Date().toISOString().split('T')[0]; 

    this.filterForm = this.fb.group({
      date: [this._datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required]
    });
    
  }

  goToEntryRecords(){
    this.router.navigate(["parking/list"])
  }

 

  getDashboardData(){
    
    this.service.getDashboardData(this.filterForm.value.date).subscribe(
      (data)=>{
        this.dashBoardData = data;
        this.renderPieChart(data.vehicleTypeInfo)
      },
      (err)=>{
        console.log(err);
        
      }
    )

    this.getLineChartData()
  }
  getLineChartData(){

   
    this.service.getLineChartData().subscribe(
      (data)=>{
        
        this.lineChartData = data;
        this.renderLineChart(data,'daily')
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }


  renderPieChart(data: any): void {
    debugger
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((item: any) => item.vehicleType),
        datasets: [{
          data: data.map((item: any) => item.count),
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
      }
    });
 
  }

  renderLineChart(data: any[], interval: 'daily' | 'weekly' | 'monthly'): void {
    const groupedData = this.groupData(data, interval);
  
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
  
    if (this.lineChart) {
      this.lineChart.destroy(); // Destroy the existing chart before creating a new one
    }
  
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: groupedData.map((item: any) => item.date), // Dates
        datasets: [{
          label: 'Vehicles Parked',
          data: groupedData.map((item: any) => item.count), // Counts
          borderColor: '#007bff',
          fill: false
        }]
      }
    });
  }

  groupData(data: any[], interval: 'daily' | 'weekly' | 'monthly') {
    if (interval === 'daily') {
      return data; // Return data as is
    }
  
    if (interval === 'weekly') {
      const weeks = data.reduce((acc: any, item: any) => {
        const date = new Date(item.date);
        const weekStart = new Date(date.setDate(date.getDate() - date.getDay())); // Get start of the week (Sunday)
        const key = weekStart.toISOString().split('T')[0];
  
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += item.count;
        return acc;
      }, {});
  
      return Object.entries(weeks).map(([date, count]) => ({ date, count }));
    }
  
    if (interval === 'monthly') {
      const months = data.reduce((acc: any, item: any) => {
        const date = new Date(item.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
  
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += item.count;
        return acc;
      }, {});
  
      return Object.entries(months).map(([date, count]) => ({ date, count }));
    }
  
    // Add a fallback or default return
    throw new Error(`Invalid interval: ${interval}`);
  }
  

  updateChart(interval: 'daily' | 'weekly' | 'monthly') {
   
    this.renderLineChart(this.lineChartData, interval);
  }

}
