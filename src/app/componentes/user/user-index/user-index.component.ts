import { Component } from '@angular/core';


@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent {

}

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Juan',
    surname: 'Pérez',
    email: 'juan.perez@example.com',
    password: '123456',
    role: 'admin',
    creationDate: new Date('2022-01-01'),
    state: true,
  },
  {
    id: 2,
    name: 'María',
    surname: 'Gómez',
    email: 'maria.gomez@example.com',
    password: 'abcdef',
    role: 'vendedor',
    creationDate: new Date('2022-02-01'),
    state: true,
  },
  {
    id: 3,
    name: 'Pedro',
    surname: 'Rodríguez',
    email: 'pedro.rodriguez@example.com',
    password: '987654',
    role: 'admin',
    creationDate: new Date('2022-03-01'),
    state: false,
  },
];
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css',
})
export class UserIndexComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'password',
    'role',
    'creationDate',
    'state',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
>>>>>>> b929d0a28f5de52d9ec8d09633eebe60f4a2a158
