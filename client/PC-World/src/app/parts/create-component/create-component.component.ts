import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  selected: string = 'processor';
  constructor(
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
  }

  getComponent(event: any) {
    this.selected = event;
    this.form.reset();
  }

  onSubmit() {
    const part = this.form.value;
    part.type = this.selected;
    this.partsService.createPart(part).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      })
  }
}
