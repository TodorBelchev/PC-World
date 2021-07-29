import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MonitorService } from 'src/app/monitor/monitor.service';

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.scss']
})
export class CreateMonitorComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fileList: {} = {};
  constructor(
    private monitorService: MonitorService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

    this.monitorService.create(formData).subscribe(
      data => {
        this.form.reset();
        this.router.navigateByUrl('/monitor/' + data._id);
      },
      error => {
        console.log(error.message);
      }
    )

  }
}
