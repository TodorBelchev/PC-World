import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {
  fileList: {} = {};
  createPromotionForm: FormGroup;
  productForm: FormGroup;
  isLoading: boolean = false;
  error: string | undefined;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      productId: ['', Validators.required]
    });
    this.createPromotionForm = this.fb.group({
      promoName: this.fb.control('', Validators.required),
      productsType: this.fb.control('', Validators.required),
      expirationDate: this.fb.control('', Validators.required),
      productIdGroup: this.fb.array([
        this.productForm
      ])
    });

  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.fileList = event.target.files;
  }

  getControls() {
    return ((this.createPromotionForm.get('productIdGroup') as FormArray).controls as FormGroup[]);
  }

  removeFormControl(index: number): void {
    const productsArray = this.createPromotionForm.controls.productIdGroup as FormArray;
    productsArray.removeAt(index);
  }

  addFormControl(): void {
    const productsArray = this.createPromotionForm.controls.productIdGroup as FormArray;
    const arrLength = productsArray.length;

    const newProductControl = this.fb.group({
      productId: ['']
    });

    productsArray.insert(arrLength + 1, newProductControl);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('productType', this.createPromotionForm.value.productsType);
    formData.append('expirationDate', this.createPromotionForm.value.expirationDate);

    for (const [k, v] of Object.entries(this.fileList)) {
      formData.append('pic' + k, v as string);
    }

    const products: string[] = [];
    this.createPromotionForm.value.productIdGroup.forEach((x: { productId: string }) => {
      products.push(x.productId);
    });
    formData.append('products', JSON.stringify(products));

    this.isLoading = true;
    this.adminService.createPromotion(formData).subscribe(
      data => {
        this.router.navigateByUrl('/');
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
