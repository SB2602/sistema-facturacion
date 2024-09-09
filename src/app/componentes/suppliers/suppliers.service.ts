import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Suppliers } from '../../interfaces/suppliers';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiUrl = 'http://localhost:8080/api/v1/suppliers';
  private suppliersSubject = new BehaviorSubject<Suppliers[]>([]);
  suppliers$ = this.suppliersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.apiUrl);
  }

  getSupplierById(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/${id}`);
  }

  addSupplier(supplier: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(this.apiUrl, supplier);
  }

  updateSupplier(id: number, supplier: Suppliers): Observable<Suppliers> {
    return this.http.put<Suppliers>(`${this.apiUrl}/${id}`, supplier); // Asegúrate de que `${this.apiUrl}/${id}` sea correcto
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshSuppliers() {
    this.getSuppliers().subscribe((suppliers) =>
      this.suppliersSubject.next(suppliers)
    );
  }
}
