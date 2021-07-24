import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMotherboard } from 'src/app/shared/interfaces/motherboard.interface';
import { PartsService } from '../parts.service';

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
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('motherboard', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.motherboard = part;
          this.editMode = true;
        },
        error => {
          this.motherboard = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.motherboard = {
        _id: '',
        brand: '',
        model: '',
        socket: '',
        formFactor: '',
        chipset: '',
        memorySlots: '',
        memorySpeeds: '',
        ramCapacity: '',
        audio: '',
        lan: '',
        wireless: '',
        connectors: '',
        storage: '',
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
