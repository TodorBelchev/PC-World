import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICooler } from 'src/app/shared/interfaces/cooler.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-cooler',
  templateUrl: './create-cooler.component.html',
  styleUrls: ['./create-cooler.component.scss']
})
export class CreateCoolerComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  cooler: ICooler | undefined;
  editMode: boolean = false;
  fileList: {} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('cooler', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.cooler = part;
          this.editMode = true;
        },
        error => {
          this.cooler = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.cooler = {
        _id: '',
        brand: '',
        model: '',
        socket: '',
        height: '',
        price: '',
        fanRPM: '',
        airflow: '',
        noise: '',
        fanSize: '',
        connector: '',
        type: '',
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
