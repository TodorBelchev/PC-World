import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { IMonitor } from 'src/app/shared/interfaces/monitor.interface';

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.scss']
})
export class CreateMonitorComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  monitor: IMonitor | undefined;
  editMode: boolean = false;
  isLoading: boolean = false;
  error: string | undefined;
  constructor(
    private monitorService: MonitorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0] && this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      this.isLoading = true;
      this.monitorService.getItem(this.activatedRoute.snapshot.url[2].path).subscribe(
        monitor => {
          this.monitor = monitor;
          this.editMode = true;
          this.isLoading = false;
        },
        error => {
          this.editMode = false;
          this.isLoading = false;
          console.log(error.error.message);
        }
      )
    }
  }

  onFileSelected(event: any) {
    this.fileList = event.target.files;
  }

  onSubmit() {
    const formData = new FormData();
    for (const [k, v] of Object.entries(this.form.value)) {
      formData.append(k, v as string);
    }


    for (const [k, v] of Object.entries(this.fileList)) {
      formData.append('pic' + k, v as string);
    }

    this.isLoading = true;
    if (this.editMode) {
      this.monitorService.edit(this.monitor!._id, formData).subscribe(
        data => {
          this.router.navigateByUrl('/monitors/' + this.monitor!._id);
          this.isLoading = false;
        },
        error => {
          this.error = error.error.message;
          console.log(error.error.message);
          this.isLoading = false;
        }
      )
    } else {
      this.monitorService.create(formData).subscribe(
        data => {
          this.router.navigateByUrl('/monitors/' + data._id);
          this.isLoading = false;
        },
        error => {
          this.error = error.error.message;
          console.log(error.error.message);
          this.isLoading = false;
        }
      );
    }

  }
}
