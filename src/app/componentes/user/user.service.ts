import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user'; // Cambia la URL según tu API
  private usersSubject = new BehaviorSubject<User[]>([]); // BehaviorSubject para manejar usuarios
  users$ = this.usersSubject.asObservable(); // Observable para usuarios

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Obtener un usuario por su ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo usuario
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualizar un usuario existente
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user); // Actualiza el usuario por ID
  }

  // Eliminar un usuario por su ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Refrescar la lista de usuarios
  refreshUsers() {
    this.getUsers().subscribe((users) => this.usersSubject.next(users));
  }
}
