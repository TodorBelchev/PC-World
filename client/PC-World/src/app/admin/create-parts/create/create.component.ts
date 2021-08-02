import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsService } from '../../../parts/parts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedPart: string = 'processors';
  fileList: {} = {};
  editMode: boolean = false;
  isLoading: boolean = false;
  id: string = '';
  error: string | undefined;
  constructor(
    private partsService: PartsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      let partName = this.activatedRoute.snapshot.url[2].path;
      this.id = this.activatedRoute.snapshot.url[3].path;
      this.selectedPart = partName;
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  getComponent(event: any) {
    this.selectedPart = event;
  }

  onFilesSubmitted(event: any) {
    this.fileList = event.fileList;
  }

  onSubmit(event: any) {
    if (event.partType) {
      this.selectedPart = event.partType + 's';
    }
    const formData = new FormData();
    for (const [k, v] of Object.entries(event.form.value)) {
      formData.append(k, v as string);
    }


    for (const [k, v] of Object.entries(this.fileList)) {
      formData.append('pic' + k, v as string);
    }


    this.isLoading = true;
    if (event.editMode) {
      this.partsService.editPart(formData, this.selectedPart, this.id).subscribe(
        part => {
          event.form.reset();
          this.router.navigateByUrl(`components/${this.selectedPart}/${part._id}`);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.error = error.error.message;
          console.log(error.error.message);
        }
      );
    } else {
      this.partsService.createPart(formData, this.selectedPart).subscribe(
        part => {
          event.form.reset();
          this.router.navigateByUrl(`components/${this.selectedPart}/${part._id}`)
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.error = error.error.message;
          console.log(error.error.message);
        }
      );
    }
  }
}
