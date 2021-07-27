import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  products: [] = [];
  type: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      url => {
        this.type = url[1].path;

        if (this.type === 'memories') {
          this.type = 'memory';
        } else {
          this.type = this.type.substring(0, this.type.length - 1);
        }

        
        this.partsService.getItems(`product=${this.type}`).subscribe(
          data => {
            this.products = data;
          },
          error => {
            console.log(error.message);
          }
        );
      }
    );
  }

}
