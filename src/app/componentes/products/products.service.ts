import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Products } from '../../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/api/v1/products';
  private productsSubject = new BehaviorSubject<Products[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.apiUrl, product);
  }
  updateProduct(id: number, product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiUrl}/${id}`, product); // Asegúrate de que ${this.apiUrl}/${id} sea correcto
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshProducts() {
    this.getProducts().subscribe((products) =>
      this.productsSubject.next(products)
    );
  }
}
