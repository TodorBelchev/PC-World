import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'app-create-notebook',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.scss']
})
export class CreateNotebookComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  constructor(
    private notebookService: NotebookService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    
    this.notebookService.create(formData).subscribe(
      data => {
        this.form.reset();
        this.router.navigateByUrl('notebooks/' + data._id);
      },
      error => {
        console.log(error.message);
      });

  }
}
