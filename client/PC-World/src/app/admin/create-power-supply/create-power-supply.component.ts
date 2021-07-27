import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';
import { IPsu } from 'src/app/shared/interfaces/psu.interface';

@Component({
  selector: 'app-create-power-supply',
  templateUrl: './create-power-supply.component.html',
  styleUrls: ['./create-power-supply.component.scss']
})
export class CreatePowerSupplyComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  psu: IPsu | undefined;
  editMode: boolean = false;
  fileList: {} = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('psu', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.psu = part;
          this.editMode = true;
        },
        error => {
          this.psu = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.psu = {
        _id: '',
        brand: '',
        model: '',
        formFactor: '',
        certificate: '',
        efficiency: '',
        type: '',
        connectors: '',
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
