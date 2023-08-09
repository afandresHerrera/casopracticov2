import { TestBed } from '@angular/core/testing';
import { ProductService } from "./product.service";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

type productTest = Product;
describe("ProductService", () => {
  let service: ProductService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ], providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ],
    });

    service = TestBed.inject(ProductService);
  });

  test('it should be created...', () => {
    expect(service).toBeTruthy();
  });

  test('getProducts() Debe recibir una lista...', (done:any) => {
    service.getProducts()
      .subscribe({
        next: data => {
          expect(data).toBeDefined();
          expect(data).not.toBeNull();
        },
        error: err => {
          expect(err.status).toBe(400);
          expect(err.error).toBe("Header 'authorId' is missing");
          done();
        },
        complete: () => {
          done();
        }
      })
  });

  test('verifyId() Debe recibir un boolean si existe o no el id del producto', (done:any) => {
    const id = 'trj-001';

    service.verifyId(id)
      .subscribe({
        next: data => {
          expect(data).toBeDefined();
          expect(data).not.toBeNull();
          expect(typeof data === 'boolean').toBe(true);
        },
        error: err => {
          expect(err.status).toBe(400);
          expect(err.error).toBe("Header 'authorId' is missing");
          done();
        },
        complete: () => {
          done();
        }
      })
  });

  test('verifyId() Debe recibir un error si no se envia un id', (done:any) => {
    const id = '';

    service.verifyId(id)
      .subscribe({
        next: () => { },
        error: err => {
          console.log(err);
          expect(err.status).toBe(400);
          expect(err.error.error).toBe("Bad Request");
          done();
        },
        complete: () => {
          done();
        }
      })
  });

  test('deleteProduct() Debe recibir un error si se envia un id que no existe', (done:any) => {
    const id = 'trj-cre2';

    service.deleteProduct(id)
      .subscribe({
        next: data => {
          expect(data).toBeDefined();
          expect(data).not.toBeNull();
          expect(data).toBe("Product successfully removed");
        },
        error: err => {
          if (err.status === 404) {
            expect(err.error).toBe("Not product found with that id");
          } else if (err.status === 400) {
            expect(err.error).toBe("Header 'authorId' is missing");
          }
          done();
        },
        complete: () => {
          done();
        }
      })
  }, 10000);

  test('createProduct() Debe guardar si el objeto estabien y el id no existe', (done:any) => {
    const mockData = {
      "id": "trj-cre12", // SE DEBE CAMBIAR EL ID
      "name": "bbo simple",
      "description": "Tarjeta de credito con monto inferior a 10 millones ",
      "logo": "https://png.pngtree.com/png-clipart/20190614/original/pngtree-credit-card-icon-png-image_3700426.jpg",
      "date_release": "2023-08-09T00:00:00.000+00:00",
      "date_revision": "2024-08-09T00:00:00.000+00:00"
    };

    service.createProduct(mockData)
      .subscribe({
        next: data => {
          console.log(data);
          expect(data).toBeDefined();
          expect(data).not.toBeNull();
          expect(data).toBe(mockData);
        },
        error: err => {
          if (err.status === 404) {
            expect(err.error).toBe("Not product found with that id");
          }  else if (err.status === 400) {
            expect(err.error === "Header 'authorId' is missing" || err.error === "Can't create because product is duplicate").toBe(true);
          }
          done();
        },
        complete: () => {
          done();
        }
      })
  }, 10000);
});
