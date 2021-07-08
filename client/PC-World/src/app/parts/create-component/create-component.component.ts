import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {
  selected: string = 'processor';
  constructor() { }

  ngOnInit(): void {
  }

  getComponent(event: any) {
    this.selected = event;
  }
}
