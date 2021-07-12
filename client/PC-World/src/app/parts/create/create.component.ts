import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedPart: string = 'processor';
  fileList: {} = {};
  constructor(
    private partsService: PartsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getComponent(event: any) {
    this.selectedPart = event;
  }

  onFilesSubmitted(files: any) {
    this.fileList = files;
  }

  onSubmit(submittedForm: any) {
    const formData = new FormData();
    for (const [k, v] of Object.entries(submittedForm.value)) {
      formData.append(k, v as string);
    }

    
    for (const [k, v] of Object.entries(this.fileList)) {
      formData.append('pic' + k, v as string);
    }

    this.partsService.createPart(formData, this.selectedPart).subscribe(
      data => {
        submittedForm.reset();
        this.router.navigateByUrl(`components/${this.selectedPart}/${data._id}`)
      },
      error => {
        console.log(error.message);
      })
  }
}
