import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

interface ShowProduct extends Product {
  showcontext?: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  openContext?: number | null;
  products: ShowProduct[] = [];

  constructor(
    private productsService: ProductService,
    private router: Router,
    private spinner: SpinnerVisibilityService
  ) { }

  ngOnInit(): void {
    this.productsService.resetEditProduct();
    this.getProducts();
  }

  getProducts() {
    this.spinner.show();
    this.productsService.getProducts().subscribe(response => {
      this.products = response.map((res: ShowProduct) => {
        return {
          ...res,
          showcontext: false
        }
      });
      console.log(this.products);
    }).add(() => this.spinner.hide());
  }

  showContext(idx: number) {
    console.log(this.openContext, idx);
    if (!!this.openContext || this.openContext === 0) {
      this.hideContext(this.openContext);
    }

    // deberia funcionar
    if (this.openContext === idx) {
      this.hideContext(idx);
    } else {
      this.products[idx].showcontext = true;
      this.openContext = idx;
    }
  }

  hideContext(idx: number) {
    this.products[idx].showcontext = false;
    this.openContext = null;
  }

  editProduct(element: ShowProduct) {
    if (!!this.openContext || this.openContext === 0) {
      this.hideContext(this.openContext);
    }

    this.productsService.setProduct = element;
    this.router.navigateByUrl('/create-product');
  }

  deleteProduct(element: ShowProduct) {
    if (!!this.openContext || this.openContext === 0) {
      this.hideContext(this.openContext);
    }
    console.log('se elminar el elemento :' + JSON.stringify(element));
  }

  checkElement(e: MouseEvent) {
    const element = e.relatedTarget as unknown as Element;

    if (element?.parentElement?.tagName !== 'UL') {
      if (!!this.openContext || this.openContext === 0) {
        this.hideContext(this.openContext);
      }
    }
  }
}
