import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faExclamationTriangle, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input('type') type!: string;
  @Input('message') message!: string;
  @Output('closeNotification') closeNotification: EventEmitter<boolean> = new EventEmitter();
  faExclamationTriangle = faExclamationTriangle;
  faCheckSquare = faCheckSquare;
  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.closeNotification.emit(true);
  }

}
