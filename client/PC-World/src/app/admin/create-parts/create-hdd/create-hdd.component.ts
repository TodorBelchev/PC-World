import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';
import { IHdd } from 'src/app/shared/interfaces/hdd.interface';
import { ISsd } from 'src/app/shared/interfaces/ssd.interface';

@Component({
  selector: 'app-create-hdd',
  templateUrl: './create-hdd.component.html',
  styleUrls: ['./create-hdd.component.scss']
})
export class CreateHddComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean, partType: string }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean, partType: string }>();
  partType: string = '';
  hdd: IHdd | undefined;
  ssd: ISsd | undefined;
  part: IHdd | ISsd | undefined;
  editMode: boolean = false;
  fileList: {} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      if (this.activatedRoute.snapshot.url[2].path === 'hdds') {
        this.part = this.hdd;
        this.partType = 'hdd';
      } else {
        this.part = this.ssd;
        this.partType = 'ssd';
      }
      this.partsService.getItem(this.partType + 's', this.activatedRoute.snapshot.url[3].path).subscribe(
        part => {
          this.part = part;
          this.editMode = true;
        },
        error => {
          this.part = undefined;
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
    this.submitFiles.emit({ fileList: this.fileList, editMode: this.editMode, partType: this.partType });
    this.submitForm.emit({ form: this.form, editMode: this.editMode, partType: this.partType });
  }

}
