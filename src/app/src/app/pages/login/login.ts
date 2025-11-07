import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.error = '';
    this.http.post<any>('http://localhost:5191/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('/articulos');
      },
      error: () => this.error = 'Usuario o contraseña incorrectos'
    });
  }
}
