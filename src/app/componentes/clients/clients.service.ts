import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Clients } from '../../interfaces/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = 'http://localhost:8080/api/v1/clients';
  private clientsSubject = new BehaviorSubject<Clients[]>([]);
  clients$ = this.clientsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiUrl}/${id}`);
  }

  addClient(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.apiUrl, client);
  }

  updateClient(id: number, client: Clients): Observable<Clients> {
    return this.http.put<Clients>(`${this.apiUrl}/${id}`, client); // Asegúrate de que ${this.apiUrl}/${id} sea correcto
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshClients() {
    this.getClients().subscribe((clients) => this.clientsSubject.next(clients));
  }
}