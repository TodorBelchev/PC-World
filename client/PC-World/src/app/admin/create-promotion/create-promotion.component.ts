import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.productForm = this.fb.group({
      productId: ['']
    });
    this.createPromotionForm = this.fb.group({
      productsType: this.fb.control(''),
      expirationDate: this.fb.control(''),
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

    this.adminService.createPromotion(formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      }
    );
  }
  
}
