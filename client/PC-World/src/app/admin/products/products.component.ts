import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { PartsService } from 'src/app/parts/parts.service';
import { IProduct } from 'src/app/user/wishlist/wishlist.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  productToDelete: IProduct | null = null;
  selectedProduct: string = 'notebook';
  selectedPromotion: boolean = false;
  showModal: boolean = false;
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
            this.products = data.products;
            this.count = data.count;
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
      }
    });
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

  onDeleteOrder(product: IProduct): void {
    this.showModal = true;
    this.productToDelete = product;
  }

  onCancelClick(): void {
    this.showModal = false;
    this.productToDelete = null;
  }

  onConfirmedDelete(): void {
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
        
      this.services[this.selectedProduct].delete(this.productToDelete!._id, this.selectedProduct).subscribe(
        data => {
          const index = this.products.indexOf(this.productToDelete!);
          this.products.splice(index, 1);
          this.showModal = false;
          this.productToDelete = null;
        },
        error => {
          console.log(error.error.message);
        }
      )
    }
  }

}