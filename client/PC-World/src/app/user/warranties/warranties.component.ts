import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWarranty } from 'src/app/shared/interfaces/warranty.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-warranties',
  templateUrl: './warranties.component.html',
  styleUrls: ['./warranties.component.scss']
})
export class WarrantiesComponent implements OnInit {
  count: number = 0;
  page: number = 1;
  warranties: IWarranty[] = [];
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.isLoading = true;
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.page = Number(params.get('page')) || 1;
        this.userService.getWarranties(this.page).subscribe(
          data => {
            this.warranties = data.warranties;
            this.count = data.count;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            this.message = 'Something went wrong. Please try again later.';
            this.msgType = 'error';
          }
        )
      }
    );
  }

}
