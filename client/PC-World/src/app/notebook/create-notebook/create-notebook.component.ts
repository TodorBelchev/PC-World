import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-notebook',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.scss']
})
export class CreateNotebookComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      processor: [
        '',
        Validators.required
      ],
      memory: [
        '',
        Validators.required
      ]
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
