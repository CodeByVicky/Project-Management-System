import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  closureDelayCount: any;
  projectCounts: any; 

  public chart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {

    this.dashboardService.getDepartmentWiseSuccessData().subscribe(
      (data: any[]) => {
        const departments = data.map(entry => entry.department);
        const totalRegistered = data.map(entry => entry.totalRegistered);
        const totalClosed = data.map(entry => entry.totalClosed);
  
        this.createChart(departments, totalRegistered, totalClosed);

        console.log(data);
      },
      error => {
        console.error('Error fetching department data:', error);
      }
    );

   
      // this.createChart();
    


    this.dashboardService.getProjectCounts().subscribe(
      data => {
        this.projectCounts = data;
       
        console.log(data); // Log received data to the console for verification
      },
      error => {
        console.error('Error fetching project counts:', error); // Handle errors
      }
    );

    this.dashboardService.getClosureDelayCount().subscribe(data => {
      this.closureDelayCount = data;
      console.log(data);
    });
  }




  createChart(departments: string[], totalRegistered: number[], totalClosed: number[]) {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels:departments,
        datasets: [
          {
            label: 'Total Registered',
            data: totalRegistered,
            backgroundColor: 'blue'
          },
          {
            label: 'Total Closed',
            data: totalClosed,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.2,
        scales: {
          // ...
        },
        plugins: {
          datalabels: {
            anchor: 'end', // Position the labels at the end of the bars
            align: 'top', // Align the labels at the top of the bars
            formatter: (value, context) => {
              // Display the value as the label
              return value;
            },
            font: {
              size: 12 // Customize label font size
            },
            color: 'black' // Label color
          }
        }
      }
    });
  }
}
