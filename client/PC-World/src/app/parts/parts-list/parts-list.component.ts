import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProcessor } from 'src/app/shared/interfaces/processor.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  products: [] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      url => {
        let type = url[1].path;

        if (type === 'memories') {
          type = 'memory';
        } else {
          type = type.substring(0, type.length - 1);
        }

        this.partsService.getItems(`product=${type}`).subscribe(
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
