import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  datePipe!: DatePipe;
  editData?: Product | null;
  minDate!: string | null;
  productoForm!: FormGroup;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private spinner: SpinnerVisibilityService
  ) { }

  ngOnInit(): void {
    this.editData = this.productsService.editProduct;
    this.initForm();
  }

  initForm() {
    this.datePipe = new DatePipe('en-US');
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.productoForm = new FormGroup({
      id: new FormControl(this.editData?.id || null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl(this.editData?.name || null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      description: new FormControl(this.editData?.description || null, [Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl(this.editData?.logo || null, [Validators.required]),
      date_release: new FormControl(this.datePipe.transform(this.editData?.date_release, 'yyyy-MM-dd') || null, [Validators.required]),
      date_revision: new FormControl({ value: this.datePipe.transform(this.editData?.date_revision, 'yyyy-MM-dd') || null, disabled: true }, [Validators.required])
    });

    if (this.editData) {
      this.productoForm.get('id')?.disable();
      this.productoForm.get('date_release')?.patchValue(this.datePipe.transform(this.editData.date_release, 'yyyy-MM-dd'));
      this.productoForm.get('date_revision')?.disable();
    }
  }

  setDate() {
    const currentDate = this.productoForm.get('date_release')?.value;
    let date!: Date | null;

    if (currentDate) {
      date = new Date(currentDate) || null;
    }

    if ((date instanceof Date)) {
      date.setFullYear(date.getFullYear() + 1);
      date.setDate(date.getDate() + 1); // se suma el dia que se perdia en la suma del año
      this.productoForm.get('date_revision')?.patchValue(this.datePipe.transform(date, 'yyyy-MM-dd'));
    }
  }

  verifyId() {
    const control = this.productoForm.get('id');
    const currentId = control?.value;

    if (control?.valid) {
      this.productsService.verifyId(currentId).subscribe(res => {
        if (res === true) {
          console.log("el producto si existe");
          control?.setErrors({ 'repeated': true });
        } else {
          control?.setErrors(null);
        }
      });
      control?.updateValueAndValidity()
    }

  }

  sendForm() {
    if (this.productoForm.valid) {
      this.spinner.show();

      if (this.editData) {
        this.productsService.updateProduct(this.productoForm.getRawValue()).subscribe(res => {
          this.goToList();
        }).add(this.spinner.hide())
      } else {
        this.productsService.createProduct(this.productoForm.getRawValue()).subscribe(res => {
          console.log(res);
          this.goToList();
        }).add(this.spinner.hide())
      }
    } else {
      console.log('Todos los campos son requeridos');
    }
  }

  resetForm(e: Event) {
    e.preventDefault();
    this.productoForm.reset();
  }

  goToList() {
    this.router.navigateByUrl('/products');
  }

  checkForm() {
    console.log(this.productoForm);
    console.log(this.productoForm.get('id')?.errors);
  }
}
