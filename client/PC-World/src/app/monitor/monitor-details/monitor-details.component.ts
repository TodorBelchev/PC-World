import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IMonitor } from 'src/app/shared/interfaces/monitor.interface';

@Component({
  selector: 'app-monitor-details',
  templateUrl: './monitor-details.component.html',
  styleUrls: ['./monitor-details.component.scss']
})
export class MonitorDetailsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  showModal: boolean = false;
  imageIndex: number = 0;
  id = this.router.url.split('/')[2];
  monitor: IMonitor | undefined;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private monitorService: MonitorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.monitorService.getItem(this.id).subscribe(
      data => {
        this.monitor = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.message = error.error.message || 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    )
  }

  onImgClick(index: number): void {
    this.imageIndex = index;
  }

  onShowModal(event: any): void {
    this.showModal = event.showModal;
  }

  onCloseModal(): void {
    this.showModal = false;
  }

}
