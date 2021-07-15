import { Component, Input, OnInit } from '@angular/core';
import { INotebook } from 'src/app/notebook/notebook';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  @Input() product: { _id: string, price: number, quantity: number, promoPrice: number} = {
    _id: '',
    price: 0,
    quantity: 0,
    promoPrice: 0,
  };
  constructor() { }

  ngOnInit(): void {
  }
  
  onAddToCartClick(): void {

  }

}
