import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // headers!: HttpHeaders;
  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders({ 'authorId': environment.authorId });
  }

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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + 'bp/products');
  }

  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(environment.apiUrl + 'bp/products', product);
  }

  updateProduct(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(environment.apiUrl + 'bp/products', product);
  }

  deleteProduct(id: string): Observable<boolean | any> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};

    return this.http.delete<any>(environment.apiUrl + 'bp/products', options);
  }

  verifyId(id: string): Observable<boolean | any> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};

    return this.http.get<boolean | any>(environment.apiUrl + 'bp/products/verification', options);
  }
}
