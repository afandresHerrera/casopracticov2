import { Component, OnInit } from '@angular/core';
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
    private productsService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(response => {
      this.products = response.map((res: ShowProduct) => {
        return {
          ...res,
          showcontext: false
        }
      });
      console.log(this.products);
    });
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
    console.log('se editaera el elemento :' + JSON.stringify(element));
  }

  deleteProduct(element: ShowProduct) {
    if (!!this.openContext || this.openContext === 0) {
      this.hideContext(this.openContext);
    }
    console.log('se elminar el elemento :' + JSON.stringify(element));
  }

  test() {
    console.log("mouseout!");
  }
}
