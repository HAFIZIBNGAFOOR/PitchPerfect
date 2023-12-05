import { Component, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  chart:any ;
  pieChart:any;
  @Input() monthySales:string='';
  @Input() annualSales:string='';
  @Input() weeklySales:string='';
  @Input() chartData:any;
  @Input() pieChartData:any;
  @Input() chartText:string='';
  @Input() pieChartText:string='';
  @Input() chartLabels:string[]=[];
  @Input() pieLabels:string[]=[]

  
  ngOnInit(): void {
    console.log(this.chartData,' chart data inside the dashboard ',this.pieChartData);
    this.destroyCharts();
    this.createChart();
    this.createPieChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] || changes['pieChartData']) {
      this.destroyCharts()
      this.createChart();
      this.createPieChart();
    }
  }
  ngOnDestroy(): void {
    this.destroyCharts();
  }
  createChart(){
    this.chart = new Chart("canvas",{
      type:'bar',
      data: {// values on X-Axis
        labels: this.chartLabels, 
         datasets: [ 
          {
            label: this.chartText,
            data:this.chartData,
            backgroundColor: 'grey',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },   
        ]
      },
      options: {
        aspectRatio:2.5
      }
    })
  }
  createPieChart(){
    this.pieChart = new Chart('pieChart',{
        type: 'pie', //this denotes tha type of chart
        data: {// values on X-Axis
        labels: this.pieLabels,
          datasets: [{
              label:this.pieChartText,
              data: this.pieChartData,
              backgroundColor: [
                'red',
                'pink',
                'green',
                'yellow',
                'orange',
                'blue',			
              ],
              hoverOffset: 4
              }],
          },
        options: {
          aspectRatio:2.5
        }

      })
  }
  destroyCharts(){
    if(this.chart){
      this.chart.destroy()
    }
    if(this.pieChart){
      this.pieChart.destroy()
    }
  }
}
