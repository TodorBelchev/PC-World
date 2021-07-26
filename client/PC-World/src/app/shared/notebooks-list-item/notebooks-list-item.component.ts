import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notebooks-list-item',
  templateUrl: './notebooks-list-item.component.html',
  styleUrls: ['./notebooks-list-item.component.scss']
})
export class NotebooksListItemComponent implements OnInit {
  @Input() notebook: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  onAddToCart(): void {
    
  }
}
