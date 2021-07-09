import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  selected: string = 'processor';
  fileList: {} = {};
  constructor(
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
  }

  getComponent(event: any) {
    this.selected = event;
    this.form.reset();
  }

  onFileSelected(event: any) {
    console.log(event.target.files);
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

    
    const proc = this.form.value;
    proc.images = this.fileList;
    this.partsService.createPart(formData, this.selected).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      })
  }
}
