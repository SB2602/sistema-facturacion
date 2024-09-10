import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:8080/api/v1/categories';
  private categoriesSubject = new BehaviorSubject<Categories[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.apiUrl}/${id}`, category); // Asegúrate de que `${this.apiUrl}/${id}` sea correcto
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshCategories() {
    this.getCategories().subscribe((categories) =>
      this.categoriesSubject.next(categories)
    );
  }
}
