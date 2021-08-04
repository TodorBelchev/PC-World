import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-parts-share',
  templateUrl: './parts-share.component.html',
  styleUrls: ['./parts-share.component.scss']
})
export class PartsShareComponent implements OnInit {
  @ViewChild('canvas') canvas!: ElementRef;
  myChart: Chart | undefined;
  isLoading: boolean = false;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getPartsShare().subscribe(
      data => {
        const dateLabels: string[] = [];
        const sales: number[] = [];
        Object.entries(data as { part: number }).forEach(([k, v]) => {
          dateLabels.push(k);
          sales.push(v);
        });
        this.isLoading = false;
        this.myChart = new Chart(this.canvas.nativeElement, {
          type: 'pie',
          data: {
            labels: dateLabels,
            datasets: [{
              label: 'Parts sales',
              data: sales,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 71, 0.2)',
                'rgba(238, 130, 238, 0.2)',
                'rgba(255, 0, 0, 0.2)',
                'rgba(0, 0, 255, 0.2)',
                'rgba(255, 99, 71, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgb(255, 99, 71, 1)',
                'rgb(238, 130, 238, 1)',
                'rgb(255, 0, 0, 1)',
                'rgb(0, 0, 255, 1)',
                'rgba(255, 99, 71, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Sales by parts'
              }
            }
          }
        });
      },
      error => {
        this.isLoading = false;
        console.log(error.error.message);
      }
    )
  }

}
