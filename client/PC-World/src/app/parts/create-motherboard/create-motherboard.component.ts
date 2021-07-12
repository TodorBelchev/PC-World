import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-motherboard',
  templateUrl: './create-motherboard.component.html',
  styleUrls: ['./create-motherboard.component.scss']
})
export class CreateMotherboardComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<NgForm>();
  @Output() submitFiles = new EventEmitter<FileList>();
  fileList: FileList = {
    length: 1,
    item(index: number) {
      return null;
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.fileList = event.target.files;
  }

  onSubmit() {
    this.submitFiles.emit(this.fileList);
    this.submitForm.emit(this.form);
  }
}
