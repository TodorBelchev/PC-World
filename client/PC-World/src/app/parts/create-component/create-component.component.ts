import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  selectedPart: string = 'processor';
  fileList: {} = {};
  constructor(
    private partsService: PartsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getComponent(event: any) {
    this.selectedPart = event;
    this.form.reset();
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
    
    this.partsService.createPart(formData, this.selectedPart).subscribe(
      data => {
        this.router.navigateByUrl(`components/${this.selectedPart}/${data._id}`)
      },
      error => {
        console.log(error.message);
      })
  }
}
