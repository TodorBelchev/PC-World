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
  constructor(
    private monitorService: MonitorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0] && this.activatedRoute.snapshot.url[0].path === 'edit-products') {
      this.monitorService.getItem(this.activatedRoute.snapshot.url[2].path).subscribe(
        monitor => {
          this.monitor = monitor;
          this.editMode = true;
        },
        error => {
          this.editMode = false;
          console.log(error.message);
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

    if (this.editMode) {
      this.monitorService.edit(this.monitor!._id, formData).subscribe(
        data => {
          this.router.navigateByUrl('/monitors/' + this.monitor!._id);
        },
        error => {
          console.log(error.message);
        }
      )
    } else {
      this.monitorService.create(formData).subscribe(
        data => {
          this.form.reset();
          this.router.navigateByUrl('/monitors/' + data._id);
        },
        error => {
          console.log(error.message);
        }
      );
    }

  }
}
