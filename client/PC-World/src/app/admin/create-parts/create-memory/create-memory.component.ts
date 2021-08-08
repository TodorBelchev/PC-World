import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';
import { IMemory } from 'src/app/shared/interfaces/memory.interface';

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
    if (this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      this.partsService.getItem('memories', this.activatedRoute.snapshot.url[3].path).subscribe(
        part => {
          this.memory = part as IMemory;
          this.editMode = true;
        },
        error => {
          this.memory = undefined;
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
