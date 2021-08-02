import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { INotebook } from 'src/app/shared/interfaces/notebook.interface';

@Component({
  selector: 'app-create-notebook',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.scss']
})
export class CreateNotebookComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  notebook: INotebook | undefined;
  editMode: boolean = false;
  isLoading: boolean = false;
  constructor(
    private notebookService: NotebookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0] && this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      this.isLoading = true;
      this.notebookService.getById(this.activatedRoute.snapshot.url[2].path).subscribe(
        notebook => {
          this.notebook = notebook;
          this.editMode = true;
          this.isLoading = false;
        },
        error => {
          this.editMode = false;
          this.isLoading = false;
          console.log(error.message);
        }
      )
    }
  }

  onFileSelected(event: any) {
    this.fileList = event.target.files;
  }

  onSubmit() {
    const formData = new FormData();

    for (const [k, v] of Object.entries(this.form.value)) {
      formData.append(k, v as string);
    }


    for (const [k, v] of Object.entries(this.fileList)) {
      formData.append('pic' + k, v as string);
    }

    this.isLoading = true;
    if (!this.notebook) {
      this.notebookService.create(formData).subscribe(
        data => {
          this.router.navigateByUrl('notebooks/' + data._id);
          this.isLoading = false;
        },
        error => {
          console.log(error.message);
        });
    } else {
      this.notebookService.edit(this.notebook!._id, formData).subscribe(
        data => {
          this.router.navigateByUrl('notebooks/' + data._id);
          this.isLoading = false;
        },
        error => {
          console.log(error.message);
        }
      );
    }

  }
}
