import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isBrandsActive(): boolean {
    return this.router.url === '/brands' || this.router.url.includes('/brand/');
  }

  isCategoriesActive(): boolean {
    return this.router.url === '/categories' || this.router.url.includes('/category/');
  }
}
