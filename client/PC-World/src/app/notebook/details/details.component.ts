import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INotebook } from '../notebook';
import { NotebookService } from '../notebook.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  notebook :INotebook  = {
    _id: '',
    images: [''],
    brand: '',
    model: '',
    processor: '',
    processorCores: 0,
    memoryType: '',
    memoryCapacity: 0,
    memorySpeed: 0,
    storage: '',
    storageCapacity: 0,
    graphics: '',
    display: '',
    displaySize: 0,
    displayResolution: '',
    displayRefreshRate: 0,
    ports: '',
    weight: 0,
    color: '',
    dimensions: '',
    battery: '',
    OS: '',
    category: '',
    warranty: 0,
    price: 0,
    quantity: 0,
    processorBrand: '',
    processorModel: '',
    promoPrice: 0,
  };
  imageIndex: number = 0;

  constructor(
    private notebookService: NotebookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.router.url.split('/')[2];
    this.notebookService.getNotebookById(id).subscribe(
      data => {
        this.notebook = data;
      },
      error => {
        console.log(error.message);
      }
    )
  }

  onImgClick(index: number): void {
    this.imageIndex = index;
  }
}
