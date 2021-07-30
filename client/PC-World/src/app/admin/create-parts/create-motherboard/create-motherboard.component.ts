import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';
import { IMotherboard } from 'src/app/shared/interfaces/motherboard.interface';

@Component({
  selector: 'app-create-motherboard',
  templateUrl: './create-motherboard.component.html',
  styleUrls: ['./create-motherboard.component.scss']
})
export class CreateMotherboardComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  motherboard: IMotherboard | undefined;
  editMode: boolean = false;
  fileList: {} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      this.partsService.getItem('motherboards', this.activatedRoute.snapshot.url[3].path).subscribe(
        part => {
          this.motherboard = part;
          this.editMode = true;
        },
        error => {
          this.motherboard = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.fileList = event.target.files;
  }

  onSubmit() {
    this.submitFiles.emit({ fileList: this.fileList, editMode: this.editMode });
    this.submitForm.emit({ form: this.form, editMode: this.editMode });
  }
}
