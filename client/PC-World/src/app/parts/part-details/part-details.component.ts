import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
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
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';

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
  timeout: any;
  messageSub: Subscription = new Subscription();
  constructor(
    private router: Router,
    private partsService: PartsService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.partsService.getItem(this.partType, this.id).subscribe(
      data => {
        this.isLoading = false;
        this.part = data;
        if (this.partType == 'cases') {
          this.case = data as ICase;
        } else if (this.partType == 'processors') {
          this.processor = data as IProcessor;
        } else if (this.partType == 'vgas') {
          this.vga = data as IVga;
        } else if (this.partType == 'motherboards') {
          this.motherboard = data as IMotherboard;
        } else if (this.partType == 'memories') {
          this.memory = data as IMemory;
        } else if (this.partType == 'hdds') {
          this.hdd = data as IHdd;
        } else if (this.partType == 'ssds') {
          this.ssd = data as ISsd;
        } else if (this.partType == 'psus') {
          this.psu = data as IPsu;
        } else if (this.partType == 'coolers') {
          this.cooler = data as ICooler;
        }
      },
      error => {
        this.isLoading = false;
        this.message = error.error.message || 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    );

    this.messageSub = this.store.select(authSelectors.selectMessage).subscribe(
      message => {
        this.message = message?.text;
        this.msgType = message?.msgType;
        clearTimeout(this.timeout);
        if (this.msgType === 'success') {
          this.timeout = setTimeout(() => {
            this.store.dispatch(authActions.clear_message());
          }, 3000);
        }
      }
    );
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

  onCloseNotification(): void {
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }

}
