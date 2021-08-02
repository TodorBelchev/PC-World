import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { ICase } from 'src/app/shared/interfaces/case.interface';
import { ICooler } from 'src/app/shared/interfaces/cooler.interface';
import { IHdd } from 'src/app/shared/interfaces/hdd.interface';
import { IMemory } from 'src/app/shared/interfaces/memory.interface';
import { IMotherboard } from 'src/app/shared/interfaces/motherboard.interface';
import { IProcessor } from 'src/app/shared/interfaces/processor.interface';
import { IPsu } from 'src/app/shared/interfaces/psu.interface';
import { ISimpleProduct } from 'src/app/shared/interfaces/simple-product.interface';
import { ISsd } from 'src/app/shared/interfaces/ssd.interface';
import { IVga } from 'src/app/shared/interfaces/vga.interface';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  showModal: boolean = false;
  imageIndex: number = 0;
  id = this.router.url.split('/')[3];
  partType = this.router.url.split('/')[2];
  part: ISimpleProduct | undefined;
  processor: IProcessor | undefined;
  case: ICase | undefined;
  vga: IVga | undefined;
  motherboard: IMotherboard | undefined;
  memory: IMemory | undefined;
  hdd: IHdd | undefined;
  ssd: ISsd | undefined;
  psu: IPsu | undefined;
  cooler: ICooler | undefined;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private router: Router,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.partsService.getItem(this.partType, this.id).subscribe(
      data => {
        this.isLoading = false;
        this.part = data;
        if (this.partType == 'cases') {
          this.case = data;
        } else if (this.partType == 'processors') {
          this.processor = data;
        } else if (this.partType == 'vgas') {
          this.vga = data;
        } else if (this.partType == 'motherboards') {
          this.motherboard = data;
        } else if (this.partType == 'memories') {
          this.memory = data;
        } else if (this.partType == 'hdds') {
          this.hdd = data;
        } else if (this.partType == 'ssds') {
          this.ssd = data;
        } else if (this.partType == 'psus') {
          this.psu = data;
        } else if (this.partType == 'coolers') {
          this.cooler = data;
        }
      },
      error => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    )
  }

  onImgClick(index: number): void {
    this.imageIndex = index;
  }

  onShowModal(event: any): void {
    this.showModal = event.showModal;
  }

  onCloseModal(): void {
    this.showModal = false;
  }

}
