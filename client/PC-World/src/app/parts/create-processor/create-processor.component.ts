import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProcessor } from 'src/app/shared/interfaces/processor.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-processor',
  templateUrl: './create-processor.component.html',
  styleUrls: ['./create-processor.component.scss']
})
export class CreateProcessorComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  processor: IProcessor | undefined;
  editMode: boolean = false;
  fileList: {} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('processor', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.processor = part;
          this.editMode = true;
        },
        error => {
          this.processor = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.processor = {
        _id: '',
        baseClock: '',
        boostClock: '',
        box: false,
        brand: '',
        cache: '',
        cores: '',
        currentPrice: '',
        images: [],
        model: '',
        price: '',
        promoPrice: '',
        quantity: '',
        threads: '',
        warranty: ''
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
