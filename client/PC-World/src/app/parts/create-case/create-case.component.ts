import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICase } from 'src/app/shared/interfaces/case.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  case: ICase | undefined;
  editMode: boolean = false;
  fileList: {} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('case', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.case = part;
          this.editMode = true;
        },
        error => {
          this.case = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.case = {
        _id: '',
        brand: '',
        model: '',
        formFactor: '',
        supportedMB: '',
        frontPanel: '',
        height: '',
        width: '',
        length: '',
        price: '',
        currentPrice: '',
        promoPrice: '',
        quantity: '',
        warranty: '',
        images: []
      };
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
