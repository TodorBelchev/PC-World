import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  constructor(
    private partsService: PartsService,
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
    
    this.partsService.createPart(formData, 'case').subscribe(
      data => {
        this.router.navigateByUrl(`components/case/${data._id}`)
      },
      error => {
        console.log(error.message);
      })
  }
}
