import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(private router: Router) { }
  protected readonly title = signal('ExamenTienda-app');

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user && this.router.url !== '/login') {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
