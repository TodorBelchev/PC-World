import { Component, OnInit } from '@angular/core';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  processorCount: number | null = null;
  vgaCount: number | null = null;
  MBCount: number | null = null;
  memoryCount: number | null = null;
  hddCount: number | null = null;
  ssdCount: number | null = null;
  caseCount: number | null = null;
  psuCount: number | null = null;
  coolerCount: number | null = null;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.partsService.getCountAll().subscribe(
      data => {
        this.processorCount = data.processors;
        this.vgaCount = data.vga;
        this.MBCount = data.MB;
        this.memoryCount = data.memory;
        this.hddCount = data.hdd;
        this.caseCount = data.case;
        this.psuCount = data.psu;
        this.coolerCount = data.cooler;
        this.ssdCount = data.ssd;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      });
  }

}
