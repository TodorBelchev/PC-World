import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INotebook } from '../../shared/interfaces/notebook.interface';
import { NotebookService } from '../notebook.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  showModal: boolean = false;
  notebook: INotebook | undefined;
  imageIndex: number = 0;
  id = this.router.url.split('/')[2];
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;

  constructor(
    private notebookService: NotebookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.notebookService.getById(this.id).subscribe(
      data => {
        this.notebook = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    )
  }

  onImgClick(index: number): void {
    this.imageIndex = index;
  }

  onShowModal(event: any): void {
    this.showModal = event.showModal;
  }

  onCloseModal(): void {
    this.showModal = false;
  }

}
