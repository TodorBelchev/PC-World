import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { PartsService } from 'src/app/parts/parts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: { _id: string, brand: string, model: string }[] = [];
  selectedProduct: string = 'notebook';
  selectedPromotion: boolean = false;
  fetchedProduct: string = '';
  page: number = 1;
  count: number = 0;
  services: {
    notebook: NotebookService,
    monitor: MonitorService,
    processor: PartsService,
    vga: PartsService,
    hdd: PartsService,
    ssd: PartsService,
    memory: PartsService,
    motherboard: PartsService,
    case: PartsService,
    psu: PartsService,
    cooler: PartsService
  };
  constructor(
    private notebookService: NotebookService,
    private monitorService: MonitorService,
    private partsService: PartsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.services = {
      'notebook': this.notebookService,
      'monitor': this.monitorService,
      'processor': this.partsService,
      'vga': this.partsService,
      'hdd': this.partsService,
      'ssd': this.partsService,
      'memory': this.partsService,
      'motherboard': this.partsService,
      'case': this.partsService,
      'psu': this.partsService,
      'cooler': this.partsService
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(urlParams => {
      let query = '';
      let countQuery = '';
      this.selectedProduct = urlParams.product;

      urlParams.promotion === 'true' ? this.selectedPromotion = true : this.selectedPromotion = false;

      if (urlParams.product === 'memory') {
        query = '/memories?';
        countQuery = '/memories/?'
      }


      for (const [k, v] of Object.entries(urlParams)) {
        query += `${k}=${v}&`;
        countQuery += `${k}=${v}&`;
      }

      if (this.selectedProduct === 'notebook'
        || this.selectedProduct === 'monitor'
        || this.selectedProduct === 'processor'
        || this.selectedProduct == 'vga'
        || this.selectedProduct == 'hdd'
        || this.selectedProduct == 'memory'
        || this.selectedProduct == 'motherboard'
        || this.selectedProduct == 'case'
        || this.selectedProduct == 'psu'
        || this.selectedProduct == 'cooler'
        || this.selectedProduct == 'ssd') {

        this.services[this.selectedProduct].getItems(query).subscribe(
          data => {
            this.products = data;
            this.fetchedProduct = this.selectedProduct;
          },
          error => {
            console.log(error.message);
          }
        );

        this.services[this.selectedProduct].getCount(countQuery).subscribe(
          data => {
            this.count = data.count;
          },
          error => {
            console.log(error.message);
          }
        )
      }
    })
  }

  onSelectClick(): void {
    const urlParams = Object.assign({}, this.route.snapshot.queryParams);

    urlParams.page = this.page;
    urlParams.product = this.selectedProduct;
    urlParams.promotion = this.selectedPromotion;

    this.router.navigate([], { relativeTo: this.route, queryParams: urlParams });

  }

  onLoadMoreClick(): void {
    const urlParams = Object.assign({}, this.route.snapshot.queryParams);
    this.page++;
    urlParams.page = this.page;
    this.router.navigate([], { relativeTo: this.route, queryParams: urlParams });
  }

}