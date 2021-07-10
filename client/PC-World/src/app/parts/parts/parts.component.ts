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
  storageCount: number | null = null;
  constructor(
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.partsService.getCount().subscribe(data => {
      this.processorCount = data.processors;
      this.vgaCount = data.vga;
      this.MBCount = data.MB;
      this.memoryCount = data.memory;
      this.storageCount = data.hdd;
    })
  }

}
