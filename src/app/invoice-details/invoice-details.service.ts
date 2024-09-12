import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvoiceDetail } from '../interfaces/invoice-details';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {
  private apiUrl = 'http://localhost:8080/api/v1/invoice-details';
  constructor(private http: HttpClient) {}

  addDetails(invoiceId: number, details: InvoiceDetail[]): Observable<InvoiceDetail[]> {
    return this.http.post<InvoiceDetail[]>(`${this.apiUrl}/invoice/${invoiceId}`, details);
  }

  getDetails(invoiceId: number): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(`${this.apiUrl}/invoice/${invoiceId}`);
  }
}