import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _editProduct?: Product | null | undefined;

  public get editProduct(): Product | null | undefined {
    return this._editProduct;
  }
  public set setProduct(value: Product | null | undefined) {
    this._editProduct = value;
  }

  public resetEditProduct() {
    this._editProduct = null;
  }

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + 'bp/products');
  }

  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(environment.apiUrl + 'bp/products', product);
  }

  updateProduct(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(environment.apiUrl + 'bp/products', product);
  }

  verifyId(id: string): Observable<boolean | any> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};

    return this.http.get<boolean | any>(environment.apiUrl + 'bp/products/verification', options);
  }
}
