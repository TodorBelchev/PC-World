import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sales-volume',
  templateUrl: './sales-volume.component.html',
  styleUrls: ['./sales-volume.component.scss']
})
export class SalesVolumeComponent implements OnInit {
  myChart: Chart | undefined;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const ctx = document.getElementById('sales-volume') as HTMLCanvasElement;
    this.adminService.getCurrentSales('current').subscribe(
      data => {
        const dateLabels: string[] = [];
        const sales: number[] = [];
        data.forEach((x: { _id: string, total: number }) => {
          const date = new Date(x._id);
          dateLabels.push(`${date.getDate()}/${date.getMonth() + 1}`);
          sales.push(x.total);
        });
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dateLabels,
            datasets: [{
              label: 'Sales last 7 days',
              data: sales,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error => {
        console.log(error.message);
      }
    )
  }

  onSelectChange(event: any): void {
    const period = event.target.value;
    this.adminService.getCurrentSales(period).subscribe(
      data=> {
        const dateLabels: string[] = [];
        const sales: number[] = [];
        data.forEach((x: { _id: string, total: number }) => {
          const date = new Date(x._id);
          dateLabels.push(`${date.getDate()}/${date.getMonth() + 1}`);
          sales.push(x.total);
        });
        if (period == 'current') {
          this.myChart!.data.datasets[0].label = 'Sales last 7 days';
        } else {
          this.myChart!.data.datasets[0].label = 'Sales last 30 days';
        }
        this.myChart!.data.datasets[0].data = sales;
        this.myChart!.data.labels = dateLabels;
        this.myChart?.update();
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
