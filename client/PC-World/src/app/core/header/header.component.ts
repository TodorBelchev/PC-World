import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faShoppingCart, faHeart, faTshirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faTshirt = faTshirt;

  constructor() { }

  ngOnInit(): void {
  }

}
