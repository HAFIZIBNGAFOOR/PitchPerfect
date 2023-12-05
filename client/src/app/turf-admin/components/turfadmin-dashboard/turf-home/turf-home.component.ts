import { Component } from '@angular/core';
import { TurfAdminService } from '../../../turf-admin-service/turf-admin.service';

@Component({
  selector: 'app-turf-home',
  templateUrl: './turf-home.component.html',
  styleUrls: ['./turf-home.component.css']
})
export class TurfHomeComponent {
  constructor(private turfAdminService:TurfAdminService){}
  isLoggedIn!:boolean;
  monthlyBookings:any;
  chartData:any
  chartLabels :string[] = [];
  pieLabels:string[]=[]
  pieChartData:any
  weeklySales :string ='';
  monthySales :string ='';
  annualSales :string ='';
  chartText :string ='Monthly Revenue';
  pieText :string ='Turf Booked';

  ngOnInit(): void {
    if(this.turfAdminService.isLoggedIn()){
      this.isLoggedIn = true
    }
    this.turfAdminService.getTurfAdminDashboard().subscribe({
      next:(res:any)=>{
        this.chartData = res.bookingsByMonth.map((month:any)=>Number(month.TotalAmount));
        this.chartLabels = res.bookingsByMonth.map((month:any)=>`${month.month}`)
        this.pieChartData = res.turfCount.map((turf:any) => turf.count);
        this.pieLabels = res.turfCount.map((turf:any)=>turf.turfName)
        this.weeklySales = res.weeklySales;
        this.monthySales = res.monthlySales;
        this.annualSales = res.annualSales;
        
      },
      error:err=>{console.log(err,' this isthe error');
      }
    })
  }
}
