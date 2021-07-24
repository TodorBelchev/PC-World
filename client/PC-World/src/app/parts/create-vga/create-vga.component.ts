import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IVga } from 'src/app/shared/interfaces/vga.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-vga',
  templateUrl: './create-vga.component.html',
  styleUrls: ['./create-vga.component.scss']
})
export class CreateVgaComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  vga: IVga | undefined;
  editMode: boolean = false;
  fileList: {} = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('vga', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.vga = part;
          this.editMode = true;
        },
        error => {
          this.vga = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.vga = {
        _id: '',
        brand: '',
        model: '',
        cores: '',
        gameClock: '',
        boostClock: '',
        memory: '',
        memoryClock: '',
        connectors: '',
        power: '',
        quantity: '',
        warranty: '',
        images: [],
        currentPrice: '',
        promoPrice: '',
        price: ''
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
