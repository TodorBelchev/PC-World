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
  link: string = '';
  page: number = 1;
  count: number = 0;
  services: {
    notebooks: NotebookService,
    monitors: MonitorService,
    processors: PartsService,
    vgas: PartsService,
    hdds: PartsService,
    ssds: PartsService,
    memories: PartsService,
    motherboards: PartsService,
    cases: PartsService,
    psus: PartsService,
    coolers: PartsService
  };
  constructor(
    private notebookService: NotebookService,
    private monitorService: MonitorService,
    private partsService: PartsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.services = {
      'notebooks': this.notebookService,
      'monitors': this.monitorService,
      'processors': this.partsService,
      'vgas': this.partsService,
      'hdds': this.partsService,
      'ssds': this.partsService,
      'memories': this.partsService,
      'motherboards': this.partsService,
      'cases': this.partsService,
      'psus': this.partsService,
      'coolers': this.partsService
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(urlParams => {
      let query = '';
      let countQuery = '';
      this.selectedProduct = urlParams.product;

      urlParams.promotion === 'true' ? this.selectedPromotion = true : this.selectedPromotion = false;

      for (const [k, v] of Object.entries(urlParams)) {
        query += `${k}=${v}&`;
        countQuery += `${k}=${v}&`;
      }

      if (this.selectedProduct === 'notebooks'
        || this.selectedProduct === 'monitors'
        || this.selectedProduct === 'processors'
        || this.selectedProduct == 'vgas'
        || this.selectedProduct == 'hdds'
        || this.selectedProduct == 'memories'
        || this.selectedProduct == 'motherboards'
        || this.selectedProduct == 'cases'
        || this.selectedProduct == 'psus'
        || this.selectedProduct == 'coolers'
        || this.selectedProduct == 'ssds') {

        this.services[this.selectedProduct].getItems(query).subscribe(
          data => {
            this.products = data;
            this.fetchedProduct = this.selectedProduct;
            if (this.selectedProduct !== 'notebooks' && this.selectedProduct !== 'monitors') {
              this.link = '/components';
            } else {
              this.link = '';
            }
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