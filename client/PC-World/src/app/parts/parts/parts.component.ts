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
  constructor(
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.partsService.getCount().subscribe(data => {
      this.processorCount = data.processors;
      this.vgaCount = data.vga;
    })
  }

}
