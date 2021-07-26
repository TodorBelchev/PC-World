import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INotebook } from '../../shared/interfaces/notebook.interface';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'app-create-notebook',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.scss']
})
export class CreateNotebookComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  notebook: INotebook;
  editMode: boolean = false;
  constructor(
    private notebookService: NotebookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.notebook = {
      _id: '',
      OS: '',
      battery: '',
      brand: '',
      category: '',
      color: '',
      dimensions: '',
      display: '',
      displayRefreshRate: '',
      displayResolution: '',
      displaySize: '',
      graphics: '',
      images: [],
      memoryCapacity: '',
      memorySpeed: '',
      memoryType: '',
      model: '',
      ports: '',
      price: '',
      processor: '',
      processorBrand: '',
      processorCores: '',
      processorModel: '',
      promoPrice: '',
      quantity: '',
      storage: '',
      storageCapacity: '',
      warranty: '',
      weight: ''
    };
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[2] && this.activatedRoute.snapshot.url[2].path === 'edit') {
      this.notebookService.getById(this.activatedRoute.snapshot.url[1].path).subscribe(
        notebook => {
          this.notebook = notebook;
          this.editMode = true;
        },
        error => {
          this.editMode = false;
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

    if (this.notebook?._id === '') {
      this.notebookService.create(formData).subscribe(
        data => {
          this.form.reset();
          this.router.navigateByUrl('notebooks/' + data._id);
        },
        error => {
          console.log(error.message);
        });
    } else {
      this.notebookService.edit(this.notebook._id, formData).subscribe(
        data => {
          this.form.reset();
          this.router.navigateByUrl('notebooks/' + data._id);
        },
        error => {
          console.log(error.message);
        }
      );
    }

  }
}
