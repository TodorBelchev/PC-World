import { Component, OnInit } from '@angular/core';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent implements OnInit {
  notebooks: [] =[];
  constructor(
    private notebookService: NotebookService
  ) { }

  ngOnInit(): void {
    this.notebookService.getNotebooks().subscribe(
      data => {
        this.notebooks = data;
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
