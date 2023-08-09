import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productoForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productoForm = new FormGroup({
      id: new FormControl(null, null),
      name: new FormControl(null, null),
      description: new FormControl(null, null),
      logo: new FormControl(null, null),
      date_release: new FormControl(null, null),
      date_revision: new FormControl({value: '', disabled: true}, null)
    });
  }

  setDate() {
    const currentDate = this.productoForm.get('date_release')?.value;
    const datePipe = new DatePipe('en-US');
    let date!: Date | null;

    if (currentDate) {
      date = new Date(currentDate) || null;
    }

    if ((date instanceof Date)) {
      date.setFullYear(date.getFullYear() + 1);
      date.setDate(date.getDate() + 1); // se suma el dia que se perdia en la suma del año
      this.productoForm.get('date_revision')?.patchValue(datePipe.transform(date, 'yyyy-MM-dd'));
    }

  }

  sendForm() {
    console.log(this.productoForm.getRawValue());
    if (this.productoForm.valid) {
      console.log(this.productoForm.getRawValue());
    } else {
      console.log('Todos los campos son requeridos');
    }
  }
}
