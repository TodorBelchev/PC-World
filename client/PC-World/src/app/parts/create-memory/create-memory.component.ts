import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMemory } from 'src/app/shared/interfaces/memory.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-memory',
  templateUrl: './create-memory.component.html',
  styleUrls: ['./create-memory.component.scss']
})
export class CreateMemoryComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @Output() submitForm = new EventEmitter<{ form: NgForm, editMode: boolean }>();
  @Output() submitFiles = new EventEmitter<{ fileList: {}, editMode: boolean }>();
  memory: IMemory | undefined;
  editMode: boolean = false;
  fileList: {} = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[3] && this.activatedRoute.snapshot.url[3].path === 'edit') {
      this.partsService.getItem('memory', this.activatedRoute.snapshot.url[2].path).subscribe(
        part => {
          this.memory = part;
          this.editMode = true;
        },
        error => {
          this.memory = undefined;
          this.editMode = false;
          console.log(error.message);
        }
      )
    } else {
      this.memory = {
        _id: '',
        brand: '',
        model: '',
        ramCapacity: '',
        memorySpeeds: '',
        memoryType: '',
        timings: '',
        platform: '',
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
