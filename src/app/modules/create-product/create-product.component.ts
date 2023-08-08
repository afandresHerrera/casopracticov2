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
      date_revision: new FormControl(null, null)
    });
  }

  sendForm() {
    if (this.productoForm.valid) {
      console.log(this.productoForm.getRawValue());
    } else {
      console.log('Todos los campos son requeridos');
    }
  }
}
