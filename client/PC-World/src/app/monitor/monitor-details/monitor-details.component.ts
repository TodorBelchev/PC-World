import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { IMonitor } from 'src/app/shared/interfaces/monitor.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';
import { Subscription } from 'rxjs';

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
  timeout: any;
  messageSub: Subscription = new Subscription();
  constructor(
    private monitorService: MonitorService,
    private router: Router,
    private store: Store<AppState>
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
    );

    this.messageSub = this.store.select(authSelectors.selectMessage).subscribe(
      message => {
        this.message = message?.text;
        this.msgType = message?.msgType;
        clearTimeout(this.timeout);
        if (this.msgType === 'success') {
          this.timeout = setTimeout(() => {
            this.store.dispatch(authActions.clear_message());
          }, 3000);
        }
      }
    );
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

  onCloseNotification(): void {
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }

}
